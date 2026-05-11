import React, { useState, useEffect, useRef } from 'react';
import { rtdb } from '../../firebase';
import { ref, onValue, push, onDisconnect, set, serverTimestamp } from 'firebase/database';
import './LiveCounter.css';

const LiveCounter = () => {
    const [count, setCount] = useState(1);
    const [isPioneer, setIsPioneer] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [isInitialDelayed, setIsInitialDelayed] = useState(true);
    const [isReacting, setIsReacting] = useState(false);
    const intervalRef = useRef(null);
    const hideTimeoutRef = useRef(null);

    useEffect(() => {
        const showCycle = () => {
            setIsVisible(true);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 15000); // Stay for 15 seconds
        };

        // 1. Initial Delay logic
        const initialTimer = setTimeout(() => {
            setIsInitialDelayed(false);
            showCycle();

            // 2. Setup recurring interval (every 5 minutes)
            intervalRef.current = setInterval(showCycle, 300000);
        }, 15000);

        // 3. Presence Logic
        const presenceRef = ref(rtdb, 'presence');
        const newUserRef = push(presenceRef);
        set(newUserRef, { online: true, last_changed: serverTimestamp() });
        onDisconnect(newUserRef).remove();

        const pioneerTimer = setTimeout(() => setIsPioneer(false), 20000);

        let unsubscribe = null;
        let retryTimeout = null;

        const setupPresenceListener = () => {
            if (unsubscribe) unsubscribe();
            unsubscribe = onValue(presenceRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setCount(Object.keys(data).length);
                } else {
                    setCount(1);
                }
            }, (error) => {
                console.warn("Presence connection refused. Retrying...", error);
                setCount(100); 
                if (retryTimeout) clearTimeout(retryTimeout);
                retryTimeout = setTimeout(setupPresenceListener, 30000);
            });
        };

        setupPresenceListener();

        return () => {
            clearTimeout(initialTimer);
            clearTimeout(pioneerTimer);
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
            if (retryTimeout) clearTimeout(retryTimeout);
            if (unsubscribe) unsubscribe();
            set(newUserRef, null);
        };
    }, []);

    const getDisplayText = () => {
        if (count >= 100) return <><span className="count-highlight">100+</span> people viewing the site</>;
        if (count > 1) return <><span className="count-highlight">{count}</span> people viewing the site</>;
        if (isPioneer) return "Be the first person to explore this page";
        return <><span className="count-highlight">1</span> person viewing the site</>;
    };

    if (isInitialDelayed) return null;

    const handleBoxClick = (e) => {
        e.stopPropagation();
        setIsVisible(false);
    };

    const isShowingCount = !isPioneer;

    return (
        <div 
            className={`live-counter-box ${!isVisible ? 'hidden' : ''} ${isReacting ? 'reacting' : ''} ${isShowingCount ? 'is-count' : ''}`}
            onMouseEnter={() => setIsReacting(true)}
            onMouseLeave={() => setIsReacting(false)}
            onClick={handleBoxClick}
            data-cursor-tooltip={count === 1 && !isPioneer ? "It's You!" : "Close"}
        >
            <div className={`live-header ${isShowingCount ? 'centered' : ''}`}>
                <div className="live-eyes">
                    <div className="eye">
                        <div className="pupil"></div>
                    </div>
                    <div className="eye">
                        <div className="pupil"></div>
                    </div>
                </div>
            </div>
            <div className="live-content">
                <p className="live-status-text">
                    {getDisplayText()}
                </p>
            </div>
        </div>
    );
};

export default LiveCounter;

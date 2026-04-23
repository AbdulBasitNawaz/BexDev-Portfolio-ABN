import React, { useState, useEffect, useRef } from 'react';
import { rtdb } from '../../firebase';
import { ref, onValue, push, onDisconnect, set, serverTimestamp } from 'firebase/database';
import './LiveCounter.css';

const LiveCounter = () => {
    const [count, setCount] = useState(1);
    const [isPioneer, setIsPioneer] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const hideTimerRef = useRef(null);

    useEffect(() => {
        // 1. Presence Logic
        const presenceRef = ref(rtdb, 'presence');
        const newUserRef = push(presenceRef);
        set(newUserRef, { online: true, last_changed: serverTimestamp() });
        onDisconnect(newUserRef).remove();

        // 2. Pioneer Timer
        const timer = setTimeout(() => setIsPioneer(false), 20000);

        // 3. Count Listener
        const unsubscribe = onValue(presenceRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setCount(Object.keys(data).length);
            } else {
                setCount(1);
            }
        });

        return () => {
            clearTimeout(timer);
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
            unsubscribe();
            set(newUserRef, null);
        };
    }, []);

    // 4. Auto-hide logic: Trigger on count change
    useEffect(() => {
        setIsVisible(true);
        
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        
        hideTimerRef.current = setTimeout(() => {
            setIsVisible(false);
        }, 30000);

        return () => {
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        };
    }, [count]);

    const getDisplayText = () => {
        if (count > 1) {
            return (
                <>
                    <span className="count-highlight">{count}</span> people viewing the site
                </>
            );
        }
        if (isPioneer) return "Be the first person to explore this page";
        return (
            <>
                <span className="count-highlight">1</span> person viewing the site
            </>
        );
    };

    return (
        <div 
            className={`live-counter-box ${!isVisible ? 'hidden' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-cursor-tooltip={count === 1 && !isPioneer ? "It's You!" : ""}
        >
            <div className="live-dot-wrapper">
                <div className="live-dot"></div>
                <div className="live-pulse"></div>
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

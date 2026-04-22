import React, { useState, useEffect } from 'react';
import { rtdb } from '../../firebase';
import { ref, onValue, push, onDisconnect, set, serverTimestamp } from 'firebase/database';
import './LiveCounter.css';

const LiveCounter = () => {
    const [count, setCount] = useState(1);

    useEffect(() => {
        // 1. Create a reference to the presence node
        const presenceRef = ref(rtdb, 'presence');
        
        // 2. Add this user to the presence list
        const newUserRef = push(presenceRef);
        
        // 3. Set up the presence logic
        // When the user connects/joins
        set(newUserRef, {
            online: true,
            last_changed: serverTimestamp()
        });

        // 4. When the user disconnects (tab closed, etc)
        // This is handled by Firebase servers automatically
        onDisconnect(newUserRef).remove();

        // 5. Listen for changes in the count
        const unsubscribe = onValue(presenceRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const onlineUsers = Object.keys(data).length;
                setCount(onlineUsers);
            } else {
                setCount(1);
            }
        });

        return () => {
            // Cleanup on component unmount
            unsubscribe();
            set(newUserRef, null); // Manual cleanup if possible
        };
    }, []);

    return (
        <div className="live-counter">
            <div className="live-dot-container">
                <div className="live-dot"></div>
                <div className="live-pulse"></div>
            </div>
            <span className="live-text">
                <span className="live-count">{count}</span>
                <span className="live-label">Exploring Now</span>
            </span>
        </div>
    );
};

export default LiveCounter;

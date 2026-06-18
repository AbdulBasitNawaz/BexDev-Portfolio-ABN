import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { FadeIn } from "../Common/FadeIn";
import SectionHeader from "../Common/SectionHeader";
import "./Contact.css";

// Initialize EmailJS with global settings and built-in rate limit
emailjs.init({
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    limitRate: {
        id: "contact_page", // Use unique ID associated with frontend form route
        throttle: 60000     // Limit 1 request per 60 seconds
    }
});

export function Contact({ showResumeNotice, onCloseResumeNotice }) {
    const form = useRef();
    const [isSending, setIsSending] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();

        // 1. Local rate limiting check using localStorage
        const COOLDOWN_MS = 60000; // 60 seconds
        const lastSentTime = localStorage.getItem("lastEmailSentTime");
        if (lastSentTime) {
            const timeSinceLastSent = Date.now() - parseInt(lastSentTime, 10);
            if (timeSinceLastSent < COOLDOWN_MS) {
                const remainingSeconds = Math.ceil((COOLDOWN_MS - timeSinceLastSent) / 1000);
                setStatusMessage(`Please wait ${remainingSeconds} seconds before sending another message.`);
                return;
            }
        }

        setIsSending(true);
        setStatusMessage("");

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ).then(
        ).then(
            async (response) => {
                console.log('SUCCESS!', response.status, response.text);

                // Determine user's email from the form
                const formData = new FormData(form.current);
                const userEmail = formData.get("user_email");

                try {
                    // Save to Firebase (Firestore)
                    if (userEmail) {
                        await addDoc(collection(db, "subscribers"), {
                            email: userEmail,
                            timestamp: new Date()
                        });
                        console.log("Successfully saved email to Firebase.");
                    }
                } catch (dbError) {
                    console.error("Failed to save to Firebase:", dbError);
                }

                setStatusMessage("Message sent successfully!");
                setIsSending(false);
                e.target.reset();

                // Store successful transmission time in localStorage
                localStorage.setItem("lastEmailSentTime", Date.now().toString());
            },
            (error) => {
                console.log('FAILED...', error);
                // If it failed because of EmailJS limitRate feature
                if (error?.text?.includes("Too many requests")) {
                    setStatusMessage("You have been rate limited. Please try again later.");
                } else {
                    setStatusMessage("Failed to send message. Please try again.");
                }
                setIsSending(false);
            }
        );
    };

    return (
        <section id="contact" className="contact-section">
            <div className="contact-inner">
                <FadeIn>
                    <SectionHeader tag="let's_talk" title="Have a project in mind?" align="center" />
                    <p className="contact-sub">
                        I'm always open to discussing new opportunities, collaborations, or just a good conversation about tech.
                    </p>
                </FadeIn>

                {showResumeNotice && (
                    <FadeIn>
                        <div className="resume-notice-card">
                            <div className="resume-notice-content">
                                <div className="resume-notice-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="notice-svg">
                                        <path d="M12 9V14M12 17.01L12.01 16.998M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="resume-notice-details">
                                    <h4>Resume Notice</h4>
                                    <p>My updated resume is currently being revamped and is unavailable for direct download at the moment.</p>
                                    <p>Please feel free to connect via the form below or email me directly at <a href="mailto:abdulbasitnwz@gmail.com" className="resume-email-link">abdulbasitnwz@gmail.com</a>.</p>
                                </div>
                            </div>
                            <button className="resume-notice-close" onClick={onCloseResumeNotice} aria-label="Close notice">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="close-svg">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </FadeIn>
                )}

                <FadeIn delay={0.15}>
                    <form className="contact-form" ref={form} onSubmit={sendEmail}>
                        <div className="form-row">
                            <input type="text" name="user_name" className="contact-input" placeholder="Your Name" required />
                            <input type="email" name="user_email" className="contact-input" placeholder="Email Address" required />
                        </div>
                        <input type="text" name="subject" className="contact-input" placeholder="Subject" required />
                        <textarea
                            name="message"
                            className="contact-input"
                            style={{ resize: "vertical", minHeight: 130 }}
                            placeholder="Tell me about your project…"
                            required
                        />
                        <button type="submit" className="btn-primary contact-btn" disabled={isSending}>
                            {isSending ? "Sending..." : "Send Message ⌘"}
                        </button>
                        {statusMessage && (
                            <p style={{ marginTop: "1rem", color: statusMessage.includes("success") ? "#4caf50" : "#f44336", fontSize: "0.9rem" }}>
                                {statusMessage}
                            </p>
                        )}
                    </form>
                </FadeIn>
            </div>
        </section>
    );
}

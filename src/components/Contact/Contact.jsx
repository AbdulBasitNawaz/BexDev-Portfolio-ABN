import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { FadeIn } from "../Common/FadeIn";
import "./Contact.css";

// Initialize EmailJS with global settings and built-in rate limit
emailjs.init({
    publicKey: "NVp4ISpaIIpf6LFLP",
    limitRate: {
        id: "contact_page", // Use unique ID associated with frontend form route
        throttle: 60000     // Limit 1 request per 60 seconds
    }
});

export function Contact() {
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
            'service_khmmhh9',
            'template_cecf2zm',
            form.current,
            'NVp4ISpaIIpf6LFLP'
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
                    <div className="contact-tag">// let's_talk</div>
                    <h2 className="contact-title">Have a project in mind?</h2>
                    <p className="contact-sub">
                        I'm always open to discussing new opportunities, collaborations, or just a good conversation about tech.
                    </p>
                </FadeIn>
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

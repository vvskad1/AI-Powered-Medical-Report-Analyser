import React from "react";
import "./Contact.css";

export default function ContactUs() {
  return (
    <div className="contact-container">
      <br /><br />
      <div className="contact-card">
      <br /><br /> <br /><br /> <br />
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-text">
          Have questions, feedback, or partnership inquiries? We'd love to hear from you!
        </p>

        <form className="contact-form">
          <div>
            <input type="text" placeholder="Your Name" />
          </div>

          <div>
            <input type="email" placeholder="you@example.com" />
          </div>

          <div>
            <textarea placeholder="Write your message here..." />
          </div>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

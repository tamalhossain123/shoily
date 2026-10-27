"use client";
import { useState } from "react";
import { AnnouncementBar, Header, Footer, MobileDock } from "@/components/chrome";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <AnnouncementBar />
      <Header solid />
      <main className="inner-page contact-page">
        <h1>Contact Us</h1>
        <p className="page-sub">Questions about an order, sizing or a custom design? Send a message, we usually reply within a few hours.</p>
        {sent ? (
          <div className="contact-done">
            <h3>Message sent ✓</h3>
            <p>Thanks for reaching out. We will get back to you soon. For anything urgent, WhatsApp: 01567997270.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div className="form-row">
              <input required placeholder="Your name" />
              <input required type="email" placeholder="Email address" />
            </div>
            <input placeholder="Phone (optional)" />
            <select defaultValue="Order question">
              <option>Order question</option><option>Size exchange</option><option>Custom Studio</option><option>Wholesale</option><option>Other</option>
            </select>
            <textarea required placeholder="Your message" rows={5} />
            <button className="btn primary" type="submit">Send Message</button>
          </form>
        )}
        <div className="contact-cards">
          <div><h3>WhatsApp</h3><p>01567997270<br />Fastest for orders</p></div>
          <div><h3>Email</h3><p>eshoily.net@gmail.com</p></div>
          <div><h3>Studio</h3><p>Badda, Dhaka<br />Open every day, 10am to 9pm</p></div>
        </div>
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}

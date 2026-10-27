"use client";
import { useState } from "react";
import { AnnouncementBar, Header, Footer, MobileDock } from "@/components/chrome";

const faqs: [string, string][] = [
  ["How long does delivery take?", "Inside Dhaka 24 to 48 hours, outside Dhaka 2 to 4 working days. We deliver cash on delivery across all 64 districts of Bangladesh."],
  ["Is there really free delivery?", "Yes. Order any 2 t-shirts or clothing items and home delivery is completely free, anywhere in Bangladesh."],
  ["What if the size does not fit?", "No problem. Our easy size exchange means we swap it for the right size. Just message us on WhatsApp within 7 days, keep the tags on."],
  ["How do I pay?", "Cash on delivery is available everywhere. You can also pay in advance with bKash or Nagad if you prefer."],
  ["Will the print fade after washing?", "Our Japanese ultra-HD DTF prints are tested to stay like new after 50+ washes. Wash inside out in cold water for best results."],
  ["Can I order a custom design?", "Yes, that is our Custom Studio. Send us your name or design on WhatsApp and we will make it on the garment of your choice."],
  ["Do your t-shirts shrink?", "No. Every Shoily tee is bio-washed, 100% combed cotton at 240+ GSM, so it keeps its size and shape wash after wash."],
  ["How do I track my order?", "Once your order ships we send the tracking details by SMS and WhatsApp, and you can follow it until it reaches your door."],
];

export default function FaqPage() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <AnnouncementBar />
      <Header solid />
      <main className="inner-page faq-page">
        <h1>Frequently Asked Questions</h1>
        <p className="page-sub">Everything about orders, delivery, sizing and exchanges. Still stuck? WhatsApp us at 01567997270.</p>
        <div className="faq-list">
          {faqs.map(([q, a], i) => (
            <div className={`faq-item${open === i ? " open" : ""}`} key={q}>
              <button onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>{q}<span className="faq-arrow">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <p>{a}</p>}
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}

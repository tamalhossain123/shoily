import { AnnouncementBar, Header, Footer, MobileDock } from "@/components/chrome";
import { IMG } from "@/lib/data";

const posts = [
  ["How To Style Heavyweight Tees", "Style Guide", "Oct 12, 2026", IMG.sm1],
  ["240 GSM vs 180 GSM: What Actually Matters", "Fabric School", "Oct 8, 2026", IMG.sm3],
  ["5 Ways To Wear One Sweatshirt", "Style Guide", "Oct 2, 2026", IMG.sm4],
  ["Why Bio-Washed Cotton Never Shrinks", "Fabric School", "Sep 27, 2026", IMG.sm5],
  ["The Shoily Fit Guide: Finding Your Size", "Fit Guide", "Sep 20, 2026", IMG.sm6],
  ["Behind The Print: Ultra-HD DTF Explained", "Studio Notes", "Sep 14, 2026", IMG.sm7],
  ["Capsule Wardrobe With 6 Pieces", "Style Guide", "Sep 7, 2026", IMG.sm8],
  ["Caring For Your Prints: Wash Guide", "Care", "Aug 30, 2026", IMG.lc2],
  ["From Dhaka Studio To Your Doorstep", "Studio Notes", "Aug 22, 2026", IMG.lc4],
];

export default function BlogsPage() {
  return (
    <>
      <AnnouncementBar />
      <Header solid />
      <main className="inner-page blogs-page">
        <h1>Journal</h1>
        <p className="page-sub">Style notes, fabric school and stories from the Shoily studio.</p>
        <div className="blog-grid">
          {posts.map(([t, tag, date, img]) => (
            <a className="blog-card" key={t} href="/blogs/post">
              <img src={img} alt="" />
              <span className="blog-tag">{tag}</span>
              <h3>{t}</h3>
              <p>{date}</p>
            </a>
          ))}
        </div>
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}

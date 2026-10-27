"use client";
import { useState } from "react";
import { AnnouncementBar, Header, Footer, MobileDock } from "@/components/chrome";
import { ProductCard } from "@/components/sections";
import { dressUp, freshPicks } from "@/lib/data";

const all = [...freshPicks, ...dressUp];

export default function SearchPage() {
  const [type, setType] = useState("Products");
  const [shown, setShown] = useState(10);
  return (
    <>
      <AnnouncementBar />
      <Header solid />
      <main className="inner-page search-page">
        <h1>Search Results</h1>
        <form className="search-page-bar" onSubmit={(e) => e.preventDefault()}>
          <input defaultValue="knit" aria-label="Search" />
          <button type="button" className="clear-btn">Clear</button>
        </form>
        <div className="type-pills">
          {["Products", "Articles", "Pages"].map((t) => (
            <button key={t} className={type === t ? "active" : ""} onClick={() => setType(t)}>{t}</button>
          ))}
        </div>
        <div className="col-toolbar in-page">
          <span>{all.length} results</span>
          <label>Sort by: <select defaultValue="rel"><option value="rel">Relevance</option><option>Alphabetically, A-Z</option><option>Price, low to high</option></select></label>
        </div>
        <div className="grid5 search-grid">
          {all.slice(0, shown).map((p, i) => <ProductCard key={i} p={p} />)}
        </div>
        <div className="load-more">
          <p>You&apos;ve viewed {Math.min(shown, all.length)} of {all.length} products</p>
          <div className="lm-track"><div style={{ width: `${(Math.min(shown, all.length) / all.length) * 100}%` }} /></div>
          {shown < all.length && <button className="btn primary" onClick={() => setShown(all.length)}>Load More</button>}
        </div>
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}

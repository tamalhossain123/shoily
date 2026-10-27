"use client";
import { useState } from "react";
import { AnnouncementBar, Header, Footer, MobileDock } from "@/components/chrome";
import { ProductCard } from "@/components/sections";
import { dressUp, freshPicks, IMG } from "@/lib/data";

const all = [...freshPicks, ...dressUp];
const cats = ["Casual Collection", "Current Classics", "Daily Edit", "Elegant Looks", "Fashion Forward", "Heritage", "Modern Basics"];
const colors: [string, string][] = [["Beige", "#d9c7a7"], ["Black", "#111"], ["Blue", "#33507a"], ["Bronze", "#8a6d4b"], ["Brown", "#5a3d2b"], ["Gray", "#8a8a8a"], ["Green", "#3f6b4f"], ["Navy", "#1f2a44"], ["Pink", "#e3a7bd"], ["Purple", "#5d4a7a"], ["Red", "#a02c22"], ["White", "#f4f4f4"]];

const colorNames = colors.map(([n]) => n);
const catNames = ["Sweaters", "Shirts", "Jeans", "Polos", "Cardigans", "Trousers"];
const withAttrs = all.map((p, i) => ({ p, color: colorNames[i % colorNames.length], cat: catNames[i % catNames.length] }));

export default function CollectionPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [shown, setShown] = useState(10);
  const [selColors, setSelColors] = useState<string[]>([]);
  const [selCats, setSelCats] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(190);
  const toggle = (list: string[], v: string, set: (x: string[]) => void) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const filtered = withAttrs.filter(({ p, color, cat }) =>
    (selColors.length === 0 || selColors.includes(color)) &&
    (selCats.length === 0 || selCats.includes(cat)) &&
    p.price <= maxPrice);
  const items = filtered.slice(0, shown).map(({ p }) => p);
  const clearFilters = () => { setSelColors([]); setSelCats([]); setMaxPrice(190); };
  return (
    <>
      <AnnouncementBar />
      <Header solid />
      <main className="inner-page">
        <div className="col-banner">
          <img src={IMG.sm8} alt="" />
          <h1>Products</h1>
        </div>
        <div className="col-toolbar">
          <span>{filtered.length} Results</span>
          <label>Sort by: <select defaultValue="az"><option value="az">Alphabetically, A-Z</option><option>Featured</option><option>Price, low to high</option><option>Price, high to low</option></select></label>
        </div>
        <div className="col-layout">
          <aside className="col-rail">
            {cats.map((c) => <a key={c} href="#"><img src={IMG.lc1} alt="" /><span>{c}</span></a>)}
          </aside>
          <div className="grid5 col-grid">
            {items.map((p, i) => <ProductCard key={i} p={p} />)}
          </div>
        </div>
        <div className="load-more">
          <p>You&apos;ve viewed {items.length} of {filtered.length} products</p>
          <div className="lm-track"><div style={{ width: `${filtered.length ? (items.length / filtered.length) * 100 : 0}%` }} /></div>
          {shown < filtered.length && <button className="btn primary" onClick={() => setShown(filtered.length)}>Load More</button>}
        </div>
        <div className="floating-pills">
          <button className="btn primary" onClick={() => setFilterOpen(true)}>⚙ Filter</button>
          <button className="btn primary desk-only">▦ Categories</button>
        </div>
      </main>
      <Footer />
      <MobileDock />

      {filterOpen && (
        <div className="overlay center" onClick={() => setFilterOpen(false)}>
          <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
            <button className="filter-x" onClick={() => setFilterOpen(false)} aria-label="Close">✕</button>
            <h3>Availability</h3>
            <div className="pill-row"><button className="fpill">In stock ({all.length})</button><button className="fpill" disabled>Out of stock (0)</button></div>
            <h3>Price</h3>
            <input type="range" min={0} max={190} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="price-range" />
            <div className="pill-row"><span className="fpill">From $0</span><span className="fpill">To ${maxPrice}</span></div>
            <h3>Color</h3>
            <div className="pill-row">{colors.map(([n, c]) => <button key={n} className={`fpill${selColors.includes(n) ? " sel" : ""}`} onClick={() => toggle(selColors, n, setSelColors)}><i style={{ background: c }} />{n}</button>)}</div>
            <h3>Size</h3>
            <div className="pill-row">{["XS", "S", "M", "L", "XL", "30", "32", "34", "36"].map((s) => <button key={s} className="fpill">{s}</button>)}</div>
            <h3>Category</h3>
            <div className="pill-row">{catNames.map((s) => <button key={s} className={`fpill${selCats.includes(s) ? " sel" : ""}`} onClick={() => toggle(selCats, s, setSelCats)}>{s}</button>)}</div>
            <div className="filter-foot"><button className="btn primary" onClick={clearFilters}>Clear</button><button className="btn primary" onClick={() => setFilterOpen(false)}>Show Results ({filtered.length})</button></div>
          </div>
        </div>
      )}
    </>
  );
}

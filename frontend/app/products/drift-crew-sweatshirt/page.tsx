"use client";
import { useEffect, useState } from "react";
import { AnnouncementBar, Header, Footer, MobileDock } from "@/components/chrome";
import { ProductCard } from "@/components/sections";
import { IMG, dressUp } from "@/lib/data";

const media = [IMG.pro1a, IMG.pro1b, IMG.pro1c, IMG.pro1d, IMG.pro1f];
const features: [string, string][] = [
  ["Fabric Composition", "70% Cotton, 30% Polyester"], ["Fabric Weight", "180 GSM"],
  ["Breathability", "High - keeps you cool"], ["Texture", "Soft brushed fleece"],
  ["Color Fastness", "Excellent - wash safe"], ["Shrink Resistance", "Pre-shrunk, true to size"],
];

export default function ProductPage() {
  const [color, setColor] = useState("Maroon");
  const [size, setSize] = useState("XS");
  const [qty, setQty] = useState(1);
  const [main, setMain] = useState(media[0]);
  const [tab, setTab] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [sizeChart, setSizeChart] = useState(false);
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <AnnouncementBar />
      <Header solid />
      <main className="inner-page pdp">
        <div className="pdp-layout">
          <div className="feat-gallery">
            <div className="thumb-rail">
              <button aria-label="Up">⌃</button>
              {media.map((t) => <img key={t} src={t} alt="" className={t === main ? "sel" : ""} onClick={() => setMain(t)} />)}
              <button aria-label="Down">⌄</button>
            </div>
            <div className="feat-main zoomable" onClick={() => setLightbox(true)} title="Click to zoom"><img src={main} alt="Drift Crew Sweatshirt" /></div>
          </div>
          <div className="buy-card">
            <div className="discount-strip">Where&apos;s the discount? <span>SAVE20 ⌄</span></div>
            <h2>Drift Crew Sweatshirt</h2>
            <p className="buy-desc">Wear it on its own for a laid-back look or layer it over a tee or under a jacket when the temperature drops.</p>
            <p className="buy-price">$104.00 <s>$120.00</s></p>
            <div className="model-bar">The model is 173 cm tall and is wearing size S</div>
            <p className="opt-label">Color: <b>{color}</b></p>
            <div className="swatches">
              {[["Maroon", "#7b2d26"], ["Gray", "#8a8a8a"], ["Navy", "#1f2a44"], ["Bronze", "#8a6d4b"]].map(([n, c]) => (
                <button key={n} className={color === n ? "sel" : ""} style={{ background: c }} aria-label={n} onClick={() => setColor(n)} />
              ))}
            </div>
            <p className="opt-label">Size: <b>{size}</b></p>
            <div className="size-pills">
              {["XS", "S", "M", "L", "XL"].map((s) => <button key={s} className={size === s ? "sel" : ""} onClick={() => setSize(s)}>{s}</button>)}
            </div>
            <p className="stock-line"><i />100 in stock, Get yours today!</p>
            <div className="buy-row">
              <div className="qty big"><button onClick={() => setQty(Math.max(1, qty - 1))}>-</button><span>{qty}</span><button onClick={() => setQty(qty + 1)}>+</button></div>
              <button className="btn primary grow">Add To Cart</button>
            </div>
            <button className="btn outline full">Buy It Now</button>
            <div className="pickup">🛍 Pickup available at <b>US Warehouse</b><span>Usually ready in 24 hours</span></div>
            <div className="buy-acc"><span>Product Description</span><span>+</span></div>
            <button className="buy-acc btnlike" onClick={() => setSizeChart(true)}><span>Size guide for Men</span><span>+</span></button>
            <div className="buy-acc"><span>Clothing Care Instructions</span><span>+</span></div>
            <div className="offer-box">Limited time offer<br /><b>Get $20 off when you spend $1,000 or more!</b></div>
            <div className="trust-row">
              <span>🔒 Secure checkout</span><span>💵 Cash on delivery</span><span>🔁 Easy size exchange</span>
            </div>
            <p className="opt-label">Pairs well with</p>
            <div className="pairs">
              {dressUp.slice(0, 3).map((p) => <div className="pair" key={p.name}><img src={p.img} alt="" /><span>{p.name}</span><b>${p.price.toFixed(2)}</b></div>)}
            </div>
          </div>
        </div>

        <div className="pdp-tabs">
          {["01 Details", "02 Fabric & Care", "03 Specifications"].map((t, i) => (
            <button key={t} className={tab === i ? "active" : ""} onClick={() => setTab(i)}>{t}</button>
          ))}
        </div>
        <div className="key-features">
          <h3>Key Features</h3>
          <div className="kf-grid">
            {features.map(([k, v]) => <div className="kf" key={k}><span>✦</span><div><b>{k}</b><p>{v}</p></div></div>)}
          </div>
        </div>

        <section className="section also">
          <h2>You may also like</h2>
          <div className="grid5">{dressUp.slice(0, 5).map((p) => <ProductCard key={p.name} p={p} />)}</div>
        </section>

        <section className="section also">
          <h2>Recently viewed</h2>
          <div className="grid5">{dressUp.slice(5, 9).map((p) => <ProductCard key={p.name} p={p} />)}</div>
        </section>
      </main>
      {sticky && (
        <div className="sticky-atc">
          <img src={IMG.pro1a} alt="" />
          <div><b>Drift Crew Sweatshirt</b><span>$104.00 · {color} / {size}</span></div>
          <button className="btn primary">Add To Cart</button>
        </div>
      )}
      {sizeChart && (
        <div className="overlay center" onClick={() => setSizeChart(false)}>
          <div className="filter-modal size-modal" onClick={(e) => e.stopPropagation()}>
            <button className="filter-x" onClick={() => setSizeChart(false)} aria-label="Close">✕</button>
            <h3>Size guide for Men</h3>
            <table className="size-table">
              <thead><tr><th>Size</th><th>Chest (in)</th><th>Length (in)</th><th>Sleeve (in)</th></tr></thead>
              <tbody>
                {[["S", "38", "26", "23"], ["M", "40", "27", "24"], ["L", "42", "28", "24.5"], ["XL", "44", "29", "25"], ["XXL", "46", "30", "25.5"]].map((r) => (
                  <tr key={r[0]}>{r.map((c) => <td key={c}>{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
            <p className="acc-body">Between sizes? Shoily tees are bio-washed and pre-shrunk, so order your usual size with confidence. Free size exchange if it does not fit.</p>
          </div>
        </div>
      )}
      {lightbox && (
        <div className="overlay center lightbox" onClick={() => setLightbox(false)}>
          <img src={main} alt="Drift Crew Sweatshirt enlarged" />
          <button className="lb-x" aria-label="Close">✕</button>
        </div>
      )}
      <Footer />
      <MobileDock />
    </>
  );
}

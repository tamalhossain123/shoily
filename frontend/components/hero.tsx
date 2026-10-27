"use client";
import { useState } from "react";
import { IMG, MOBILE_TABS } from "@/lib/data";

/**
 * Mobile category section (below 768px only, replaces the desktop hero).
 * Built from the demo section Tamal pasted on 2026-10-24 + mobile-category.css:
 * folder-style tabs (All / Men / Women / On Sale) that actually switch panels,
 * each panel has its own subcategory swipe row (58px square thumbs, radius
 * 14px, heading-font label underneath, collection image per item) and its own
 * media card (430px tall, radius 30px, bottom dark gradient overlay, white
 * heading centred at the bottom). Section spacers: top 0, bottom 40px.
 */
function MobileCategory() {
  const [active, setActive] = useState(0);
  const tab = MOBILE_TABS[active];
  return (
    <div className="mobile-cat">
      <div className="mcat-tabs" role="tablist">
        {MOBILE_TABS.map((t, i) => (
          <button
            key={t.name}
            role="tab"
            aria-selected={i === active}
            className={`mcat-tab${i === active ? " active" : ""}`}
            onClick={() => setActive(i)}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div className="mcat-panel" role="tabpanel">
        <div className="mcat-subs">
          {tab.subs.map((s) => (
            <a key={s.label} href="/collections/all" className="mcat-sub">
              <span className="mcat-thumb"><img src={s.img} alt="" loading="lazy" /></span>
              <span className="mcat-label">{s.label}</span>
            </a>
          ))}
        </div>
        <div className="mcat-card">
          <img src={tab.media} alt="" />
          <div
            className="mcat-shade"
            style={{ background: `linear-gradient(0deg, rgba(0,0,0,0.7), ${tab.overlayEnd} 53%)` }}
          />
          <div className="mcat-content">
            <h2 className={tab.big ? "big" : ""}>{tab.heading}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Hero, rebuilt from the demo section's own specs (pasted by Tamal, 2026-10-24):
 *  - section vars: --duration 12s, --horizontalSpacing 50px, --heroTextSize 180px,
 *    --heroTextColor white, --heroTextBlendMode overlay
 *  - background photo + dark overlay gradient (180deg, .4 -> .09 at 26% -> .04)
 *  - marquee: absolute centre (top 50%), direction rtl = scrolling left,
 *    each node animates translateX(0 -> -100%) over 12s linear infinite
 *  - the giant text is plain white with mix-blend-mode: overlay, so the photo
 *    shows through the letters and the tint shifts with the background.
 *    (data-enable-shape="false" and data-has-animated-media="false" in the
 *    pasted section, so the shape / tilt JS does nothing on this hero.)
 *  - heading split into words, words fade in staggered on load
 *  - bottom row: left heading + Shop Now pill (white, black circle arrow icon),
 *    right description (428px, left aligned)
 */
export function Hero() {
  const nodes = Array.from({ length: 5 }, (_, i) => (
    <div className="marquee-node" key={i} aria-hidden={i > 0}>
      <div className="marquee-item">
        <div className="marquee-text">Spring Sale</div>
      </div>
    </div>
  ));
  const wordsTop = ["The", "New", "Season"];
  const wordsBottom = ["Starts", "Here"];
  return (
    <section className="hero">
      <img className="hero-img" src={IMG.hero} alt="" />
      <div className="hero-shade" />
      <div className="hero-marquee" aria-label="Spring Sale">{nodes}</div>
      <div className="hero-bottom">
        <div className="hero-left">
          <h1 className="hero-heading">
            {wordsTop.map((w, i) => (
              <span className="split-word" key={w} style={{ animationDelay: `${i * 0.09}s` }}>{w} </span>
            ))}
            <br />
            {wordsBottom.map((w, i) => (
              <span className="split-word" key={w} style={{ animationDelay: `${(i + 3) * 0.09}s` }}>{w} </span>
            ))}
          </h1>
          <a className="btn hero-cta" href="/collections/all">
            <span>Shop Now</span>
            <span className="cta-arrow" aria-hidden>
              <svg viewBox="0 0 8 8" width="9" height="9" fill="none">
                <path d="M1 7L7 1M3 1h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
        <p className="hero-copy">
          Curated wardrobe staples crafted from premium fabrics, blending timeless
          silhouettes with effortless versatility to create confident style for every season.
        </p>
      </div>

      {/* Mobile only (below 768px): the desktop hero is hidden and this
          category section replaces it, same as the demo. */}
      <MobileCategory />
    </section>
  );
}

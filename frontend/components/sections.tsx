"use client";
import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import { IMG, Product, SmgCard, SmgProduct, freshPicks, collections, brands, DROP_VIDEO, DROP_POSTER, tabProducts, stlLooks, fpMedia, fpColors, lbcProducts, lbcLooks, twfBg, twfImgs, smgCards, smgAvatar } from "@/lib/data";

export function ProductCard({ p }: { p: Product }) {
  const [qv, setQv] = useState(false);
  const [size, setSize] = useState("M");
  return (
    <article className="pcard">
      <div className="pcard-media">
        <img className="pcard-img main" src={p.img} alt={p.name} loading="lazy" />
        <img className="pcard-img hover" src={p.hoverImg} alt="" loading="lazy" />
        {p.badge ? <span className="pcard-badge">{p.badge}</span> : null}
        <button className="pcard-eye" aria-label={`Quick view ${p.name}`} onClick={() => setQv(true)}>
          <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true"><path d="M1.6 8C3.6 3.9 12.4 3.9 14.4 8 12.4 12.1 3.6 12.1 1.6 8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /><circle cx="8" cy="8" r="2.1" fill="currentColor" /></svg>
        </button>
        <div className="pcard-swatches"><span>Color</span><span className="pcard-dots">{(p.colors ?? ["#7b2d26", "#555555", "#1f2a44", "#8a6d4b"]).map((c) => <i key={c} style={{ background: c }} />)}</span></div>
      </div>
      <div className="pcard-detail">
        <h3><a href="/products/drift-crew-sweatshirt">{p.name}</a></h3>
        <div className="pcard-info">
          <p className="pcard-price">{p.from ? "From " : ""}${p.price.toFixed(2)}{p.compareAt ? <s>${p.compareAt.toFixed(2)}</s> : null}</p>
          <button className="dot-link pcard-choose" onClick={() => setQv(true)}><i />Choose Options</button>
        </div>
      </div>
      {qv && (
        <div className="overlay center" onClick={() => setQv(false)}>
          <div className="qv-modal" onClick={(e) => e.stopPropagation()}>
            <button className="filter-x static-x" onClick={() => setQv(false)} aria-label="Close">✕</button>
            <img src={p.img} alt={p.name} />
            <div className="qv-info">
              <h3>{p.name}</h3>
              <p className="buy-price">${p.price.toFixed(2)}{p.compareAt ? <s>${p.compareAt.toFixed(2)}</s> : null}</p>
              <p className="opt-label">Size: <b>{size}</b></p>
              <div className="size-pills">{["XS", "S", "M", "L", "XL"].map((s) => <button key={s} className={size === s ? "sel" : ""} onClick={() => setSize(s)}>{s}</button>)}</div>
              <p className="stock-line"><i />In stock, ready to ship</p>
              <button className="btn primary full">Add To Cart</button>
              <a className="qv-full" href="/products/drift-crew-sweatshirt">View full details ›</a>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

function SectionHead({ title, linkText, children }: { title: React.ReactNode; linkText?: string; children?: React.ReactNode }) {
  return (
    <div className="sec-head">
      <h2>{title}</h2>
      <div className="sec-head-right">{children}{linkText ? <a className="dot-link" href="/collections/all"><i />{linkText}</a> : null}</div>
    </div>
  );
}

/**
 * Categories grid ("Discover Signature Collections"), rebuilt from the demo
 * section pasted by Tamal 2026-10-24 + categories-grid.css / .js:
 *  - hidden below 768px; spacers top 60 / bottom 40 on desktop
 *  - two flex rows, column gap 12px, row gap 13px, tile radius 12px
 *  - tile height = --textSize (170px at 1200+, 136 at 1025+, 102 at 768+)
 *  - titles are HIDDEN until hover: they zoom from scale(2) to scale(1) and
 *    fade in over a dark overlay, while the image scales to 1.1 and blurs 2px
 *    (the demo's "normal-blur" hover; its JS does nothing for this mode)
 *  - DROP cell: an autoplaying muted loop VIDEO sits behind a white layer
 *    with black DROP text in mix-blend-mode: screen, so the video shows
 *    through the letters only (text-background-light in the demo)
 *  - items reveal on scroll (fade + rise, staggered), like the demo's
 *    data-item end state (translateY(0), opacity 1)
 */
export function Collections() {
  const tiles = collections;
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const tile = (c: (typeof collections)[number], i: number) => (
    <a
      className="tile"
      key={c.name}
      href="/collections/all"
      aria-label={c.name}
      style={{ transitionDelay: `${i * 60}ms` }}
    >
      <img src={c.img} alt={c.name} loading="lazy" />
      <span className="tile-title">{c.name}</span>
    </a>
  );
  return (
    <section className={`section collections catgrid${seen ? " seen" : ""}`} ref={ref}>
      <SectionHead title="Discover Signature Collections" linkText="Explore All Collections" />
      <div className="cat-row">
        {tiles.slice(0, 6).map((c, i) => tile(c, i))}
      </div>
      <div className="cat-row">
        {tile(tiles[6], 6)}
        {tile(tiles[7], 7)}
        <div className="drop-cell" aria-hidden style={{ transitionDelay: "480ms" }}>
          <video className="drop-video" autoPlay muted loop playsInline preload="metadata" poster={DROP_POSTER}>
            <source src={DROP_VIDEO} type="video/mp4" />
          </video>
          <div className="drop-text">DROP</div>
        </div>
        {tile(tiles[8], 8)}
      </div>
    </section>
  );
}

export function FreshPicks() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>(".pcard");
    if (slide && el.scrollLeft === 0) el.scrollLeft = slide.offsetWidth;
  }, []);
  const scrollBy = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>(".pcard");
    el.scrollBy({ left: dir * (slide ? slide.offsetWidth : 320), behavior: "smooth" });
  };
  return (
    <section className="section fresh">
      <div className="sec-head">
        <h2>Fresh picks have<br />just dropped for you.</h2>
        <div className="sec-head-right">
          <p className="sec-copy">Thoughtfully selected styles designed for everyday comfort, effortless layering, and timeless appeal.</p>
          <a className="dot-link" href="/collections/all"><i />View All</a>
        </div>
      </div>
      <div className="carousel-wrap">
        <button className="car-btn prev" onClick={() => scrollBy(-1)} aria-label="Previous slide">
          <svg viewBox="0 0 40 12" width="38" height="12" fill="none" aria-hidden="true"><path d="M39 6H3M8.5 1 3 6l5.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className="carousel" ref={ref}>
          {freshPicks.map((p) => <ProductCard key={p.name} p={p} />)}
        </div>
        <button className="car-btn next" onClick={() => scrollBy(1)} aria-label="Next slide">
          <svg viewBox="0 0 40 12" width="38" height="12" fill="none" aria-hidden="true"><path d="M1 6h36M31.5 1 37 6l-5.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </section>
  );
}

export function SplitBanners() {
  const panels = [
    {
      eyebrow: "STYLE MEETS CONFIDENCE", title: "Shop Men", front: IMG.menFront, back: IMG.menBack, link: "Discover the Edit",
      chips: [
        { icon: IMG.icoProperFit, label: "Proper Fit" },
        { icon: IMG.icoComfort, label: "Comfort Fit Style" },
        { icon: IMG.icoEasyCare, label: "Easy Care" },
        { icon: IMG.icoRelaxedFit, label: "Wind Resistant" },
        { icon: IMG.icoLightweight, label: "Lightweight Material" },
      ],
    },
    {
      eyebrow: "ELEVATE YOUR STYLE", title: "Shop Women", front: IMG.womenFront, back: IMG.womenBack, link: "Browse All Styles",
      chips: [
        { icon: IMG.icoSkinFriendly, label: "Skin Friendly" },
        { icon: IMG.icoVersatile, label: "Versatile Style" },
        { icon: IMG.icoComfortW, label: "Comfort Fit Style" },
        { icon: IMG.icoQuickDry, label: "Quick Dry" },
        { icon: IMG.icoShape, label: "Shape Retention" },
      ],
    },
  ];
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const go = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };
  return (
    <section className="panels">
      <div
        className="panels-track"
        ref={trackRef}
        onScroll={(e) => setIdx(Math.round(e.currentTarget.scrollLeft / Math.max(1, e.currentTarget.clientWidth)))}
      >
        {panels.map((panel) => (
          <article className="cpanel" key={panel.title}>
            <img className="cpanel-bg" src={IMG.panelBg} alt="" loading="lazy" />
            <img className="cpanel-bg hover" src={IMG.panelBgHover} alt="" loading="lazy" />
            <div className="cpanel-content">
              <p className="cpanel-eyebrow">{panel.eyebrow}</p>
              <h2 className="cpanel-name script">{panel.title}</h2>
              <a className="dot-link cpanel-cta-mobile" href="/collections/all"><i />{panel.link}</a>
            </div>
            <div className="cpanel-media">
              <img className="cpanel-front" src={panel.front} alt={panel.title} loading="lazy" />
              <img className="cpanel-back" src={panel.back} alt="" loading="lazy" />
            </div>
            <ul className="cpanel-chips">
              {panel.chips.map((c, i) => (
                <li key={c.label} style={{ "--d": `${0.05 + i * 0.1}s` } as CSSProperties}>
                  <a href="/collections/all"><img src={c.icon} alt="" loading="lazy" />{c.label}</a>
                </li>
              ))}
            </ul>
            <a className="dot-link cpanel-cta" href="/collections/all"><i />{panel.link}</a>
          </article>
        ))}
      </div>
      <button className="panels-nav prev" onClick={() => go(-1)} disabled={idx === 0} aria-label="Previous panel">
        <svg viewBox="0 0 40 12" width="34" height="11" fill="none" aria-hidden="true"><path d="M39 6H3M8.5 1 3 6l5.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button className="panels-nav next" onClick={() => go(1)} disabled={idx === 1} aria-label="Next panel">
        <svg viewBox="0 0 40 12" width="34" height="11" fill="none" aria-hidden="true"><path d="M1 6h36M31.5 1 37 6l-5.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </section>
  );
}

const showcaseData = [
  { name: "Jackets", img: IMG.showcase1, icon: IMG.icoJacket, desc: "Stylish jackets crafted for warmth, comfort, and everyday confidence." },
  { name: "Sports Wear", img: IMG.showcase2, icon: IMG.icoSports, desc: "Classic stripes and polished knits made for everyday comfort and easy layering." },
  { name: "Relaxed Fit", img: IMG.showcase3, icon: IMG.icoRelax, desc: "Relaxed silhouettes offering effortless comfort for every casual occasion." },
];
const scMarquee = ["Designed to Stand Out", "Elevate Your Wardrobe", "Timeless Fits. Modern Style."];

export function Showcase() {
  const wrapRef = useRef<HTMLElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const cardItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [itemH, setItemH] = useState(70);
  const [cardH, setCardH] = useState(300);
  const [cardY, setCardY] = useState(0);

  useEffect(() => {
    const measure = () => {
      const first = itemRefs.current[0];
      if (first) setItemH(first.offsetHeight);
      const hs = cardItemRefs.current.map((el) => el?.offsetHeight ?? 0);
      if (hs.some((h) => h > 0)) {
        setCardH(hs[active] || hs[0]);
        setCardY(hs.slice(0, active).reduce((a, b) => a + b, 0));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const wrap = wrapRef.current;
        if (!wrap || window.innerWidth < 1025) return;
        const vh = window.innerHeight;
        const wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
        const stickyStart = wrapTop + vh;
        const scrolled = Math.min(Math.max(window.scrollY - stickyStart, 0), vh * 3);
        if (shadeRef.current) {
          const fade = Math.min(1, Math.max(0, (window.scrollY - (stickyStart - vh * 0.6)) / (vh * 0.5)));
          shadeRef.current.style.opacity = String(fade);
        }
        slideRefs.current.forEach((slide, i) => {
          if (!slide || i === 0) return;
          const p = Math.min(1, Math.max(0, (scrolled - vh * (i - 1)) / vh));
          slide.style.clipPath = `inset(${vh * (1 - p)}px 0px 0px)`;
          slide.style.borderTopLeftRadius = `${10 + p * 8}px`;
          slide.style.borderTopRightRadius = `${10 + p * 8}px`;
          const img = imgRefs.current[i];
          if (img) img.style.transform = `translate3d(0, ${8 - p * 8}%, 0)`;
        });
        const next = Math.min(showcaseData.length - 1, Math.floor(scrolled / vh));
        setActive((prev) => (prev === next ? prev : next));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i: number) => {
    const wrap = wrapRef.current;
    if (!wrap || window.innerWidth < 1025) return;
    const vh = window.innerHeight;
    const wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: wrapTop + vh + vh * i, behavior: "smooth" });
  };

  return (
    <section className="sc" ref={wrapRef}>
      <div className="sc-banner">
        <img className="sc-banner-img" src={IMG.showcaseBg} alt="" loading="lazy" />
        <div className="sc-banner-shade" ref={shadeRef} />
        <div className="sc-banner-content">
          <h2>
            {"Dress Up Your".split(" ").map((w, i) => (
              <span className="split-word" key={w} style={{ animationDelay: `${i * 0.09}s` }}>{w} </span>
            ))}
            <br />
            {"Beautiful Moments".split(" ").map((w, i) => (
              <span className="split-word" key={w} style={{ animationDelay: `${(i + 3) * 0.09}s` }}>{w} </span>
            ))}
          </h2>
        </div>
      </div>
      <div className="sc-stage">
        <div className="sc-outer">
          <div className="sc-menu">
            <p className="sc-menu-head">OUR COLLECTIONS</p>
            <div className="sc-list" style={{ height: itemH * 3, paddingTop: itemH }}>
              <div className="sc-list-inner" style={{ transform: `translate3d(0, ${-active * itemH}px, 0)` }}>
                {showcaseData.map((s, i) => (
                  <a
                    key={s.name}
                    href="/collections/all"
                    ref={(el) => { itemRefs.current[i] = el; }}
                    className={`sc-list-item${i === active ? " active" : ""}`}
                    onFocus={() => goTo(i)}
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="sc-marquee" aria-hidden="true">
              <div className="sc-marquee-track">
                {[0, 1, 2, 3].map((n) => (
                  <div className="sc-marquee-node" key={n}>
                    {scMarquee.map((t) => <span className="sc-marquee-item" key={t}>{t}</span>)}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="sc-images">
            <div className="sc-image-list">
              {showcaseData.map((s, i) => (
                <a
                  key={s.name}
                  href="/collections/all"
                  className="sc-image"
                  ref={(el) => { slideRefs.current[i] = el; }}
                  aria-label={s.name}
                >
                  <img src={s.img} alt={s.name} loading="lazy" ref={(el) => { imgRefs.current[i] = el; }} />
                  <span className="sc-mobile-content">
                    <span className="sc-mobile-name">{s.name}</span>
                    <span className="sc-mini-card">
                      <img src={s.icon} alt="" loading="lazy" />
                      <span>{s.desc}</span>
                    </span>
                  </span>
                </a>
              ))}
            </div>
            <div className="sc-card" style={{ height: cardH }}>
              <div className="sc-card-inner" style={{ transform: `translate3d(0, ${-cardY}px, 0)` }}>
                {showcaseData.map((s, i) => (
                  <div className="sc-card-item" key={s.name} ref={(el) => { cardItemRefs.current[i] = el; }}>
                    <img src={s.icon} alt="" loading="lazy" />
                    <p>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Featured Products Tabs, rebuilt from the demo section pasted by Tamal
 * 2026-10-24 + featured-products-tab.css:
 *  - spacers top 30px (20px mobile) / bottom 0, block radius 0
 *  - header row: split-words heading "Fresh picks just dropped" (h3) on the
 *    left (flex 49%), pills tab nav on the right (flex 49%, right-aligned);
 *    tabs are Premium / Fresh Picks / Trending, pill radius 30px, the active
 *    pill gets the black border (--activeBorderColor)
 *  - panel is container-full (full bleed): bordered grid, 5 cols at 1368+,
 *    4 at 1200+, 3 at 768+, 2 below; each cell bordered, card detail padded
 *    20px inline; cards rise/fade in when the panel enters the viewport
 *  - each tab shows its own demo product set (lib/data.ts tabProducts)
 */
const FPT_TABS = ["Premium", "Fresh Picks", "Trending"];
export function TabbedGrid() {
  const [tab, setTab] = useState("Premium");
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section className={`fpt${seen ? " seen" : ""}`} ref={ref}>
      <div className="fpt-head">
        <h2 className="fpt-heading">
          {"Fresh picks just dropped".split(" ").map((w, i) => (
            <span className="split-word" key={w + i} style={{ animationDelay: `${i * 0.09}s` }}>{w} </span>
          ))}
        </h2>
        <div className="fpt-tabs-wrap">
          <div className="fpt-tabs" role="tablist" aria-label="Featured products">
            {FPT_TABS.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={t === tab}
                className={`fpt-tab${t === tab ? " active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="fpt-panel" role="tabpanel">
        <div className="fpt-grid" key={tab}>
          {tabProducts[tab].map((p, i) => (
            <div className="fpt-cell" key={tab + p.name} style={{ transitionDelay: `${Math.min(i, 9) * 45}ms` }}>
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Shop the Look banner, rebuilt from the demo section pasted by Tamal
 * 2026-10-24 + shop-the-look-banner.css / .js:
 *  - full-bleed banner, media height 810px desktop / 660px mobile, separate
 *    mobile background image; content is a grid overlay: heading top-left,
 *    product slider centred at the bottom
 *  - heading in the accent (Protest Riot) font, white, split-words:
 *    "Enduring Stylish / Sophistication" + the demo description
 *  - two white hotspot pins (22px) with a blurred 42px halo that pulses on
 *    the active one; clicking a pin jumps the slider (the demo links
 *    hotspots and slides both ways)
 *  - product slider: dark glass card max 470px, image column 150px (90px
 *    mobile) with a right hairline, title + price, View / Shop now outline
 *    pills (90x36); autoplay 5s, loop, does not pause on hover
 *  - below it a nav row: glass counter pill (look title uppercase + n / 2,
 *    title crossfades with the slide) and two glass arrow pills (62x40)
 */
export function Hotspot() {
  const [idx, setIdx] = useState(0);
  const go = (dir: number) => setIdx((v) => (v + dir + stlLooks.length) % stlLooks.length);
  useEffect(() => {
    const t = setInterval(() => setIdx((idx + 1) % stlLooks.length), 5000);
    return () => clearInterval(t);
  }, [idx]);
  const look = stlLooks[idx];
  const arrow = (dir: 1 | -1) => (
    <svg viewBox="0 0 40 12" width="34" height="11" fill="none" aria-hidden="true">
      {dir === 1
        ? <path d="M1 6h36M31.5 1 37 6l-5.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        : <path d="M39 6H3M8.5 1 3 6l5.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
  return (
    <section className="stl">
      <img className="stl-bg desktop" src={IMG.stlBg} alt="" loading="lazy" />
      <img className="stl-bg mobile" src={IMG.stlBgMob} alt="" loading="lazy" />
      <button
        type="button"
        className={`stl-hot stl-hot-1${idx === 0 ? " active" : ""}`}
        aria-label="Hotspot 1"
        onClick={() => setIdx(0)}
      ><span /></button>
      <button
        type="button"
        className={`stl-hot stl-hot-2${idx === 1 ? " active" : ""}`}
        aria-label="Hotspot 2"
        onClick={() => setIdx(1)}
      ><span /></button>
      <div className="stl-content">
        <div className="stl-top">
          <h2 className="stl-heading">
            {"Enduring Stylish".split(" ").map((w, i) => (
              <span className="split-word script" key={w} style={{ animationDelay: `${i * 0.09}s` }}>{w} </span>
            ))}
            <br />
            <span className="split-word script" style={{ animationDelay: "0.27s" }}>Sophistication</span>
          </h2>
          <p className="stl-desc">Enduring Stylish Sophistication blends timeless elegance with lasting style.</p>
        </div>
        <div className="stl-bottom">
          <div className="stl-card" key={idx}>
            <div className="stl-card-media">
              <img src={look.img} alt={look.name} loading="lazy" />
            </div>
            <div className="stl-card-info">
              <div className="stl-card-text">
                <a href="/products/drift-crew-sweatshirt">{look.name}</a>
                <p>${look.price.toFixed(2)}</p>
              </div>
              <div className="stl-card-btns">
                <a className="stl-btn" href="/products/drift-crew-sweatshirt">View</a>
                <a className="stl-btn" href="/products/drift-crew-sweatshirt">Shop now</a>
              </div>
            </div>
          </div>
          <div className="stl-nav">
            <div className="stl-counter">
              <span className="stl-counter-title" key={idx}>{look.title}</span>
              <span className="stl-counter-count">{idx + 1} / {stlLooks.length}</span>
            </div>
            <div className="stl-arrows">
              <button type="button" aria-label="Previous slide" onClick={() => go(-1)}>{arrow(-1)}</button>
              <button type="button" aria-label="Next slide" onClick={() => go(1)}>{arrow(1)}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const fpArrowL = (
  <svg viewBox="0 0 24 12" width="22" height="11" fill="none" aria-hidden="true"><path d="M23 6H2M7 1.5 2.5 6 7 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const fpArrowR = (
  <svg viewBox="0 0 24 12" width="22" height="11" fill="none" aria-hidden="true"><path d="M1 6h21M17 1.5 21.5 6 17 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/**
 * Featured product buy box, rebuilt from the demo section pasted by Tamal
 * 2026-10-24 + main-product.css / component-product-media-gallery.css /
 * component-product-blocks.css / component-variant-picker.css /
 * component-quantity.css / component-pickup-availability.css:
 *  - full-bleed, no section spacers; media 68% / info 32% at >=1280px
 *    (60% / 40% at 1025-1279px)
 *  - gallery "left-vertical-filled": thumb rail 240px (150px at 1025-1409,
 *    100px below) on a light panel, 6px inner padding, 5px gaps, 4 thumbs
 *    visible, inactive thumbs at opacity .5; main slides are square, 10px
 *    slide gap, 300ms; long-arrow pills (40x50) at bottom-right, 30px up
 *    and 20px in; picking a colour jumps to that colour's gallery image
 *  - info column padding 20px block / 30px left / min(3.5vw,65px) right;
 *    black discount strip (radius 20px top, expandable SAVE20 coupon)
 *    overlapped 20px by the white card (radius 20px, padding 30px);
 *    block gaps: title 0, text 10, price 10, model bar 20, variants 15,
 *    inventory 25, buy buttons 25, pickup 20/20, collapsibles 0
 *  - swatches 35px circles (white inset ring + black outer ring when
 *    active, demo colours Maroon/Gray/Navy/Bronze), size pills 70x42
 *    radius 30px (active black), quantity pill 120x44 + Add to cart
 *  - pickup card radius 20px bordered; the two collapsible tabs form one
 *    joined box (radius 6px, summary inset 15px each side, hairline
 *    separator under the first summary)
 *  - <=1024px: mobile gallery (square, overlay arrows, no rail) and the
 *    info column overlaps it by 20px; <=767px the card keeps only its
 *    top radius and block gaps shrink to 10px
 */
export function FeaturedProduct() {
  const [active, setActive] = useState(0);
  const [color, setColor] = useState(fpColors[0]);
  const [size, setSize] = useState("XS");
  const [qty, setQty] = useState(1);
  const [discOpen, setDiscOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openAcc, setOpenAcc] = useState(-1);
  const go = (dir: number) => setActive((a) => (a + dir + fpMedia.length) % fpMedia.length);
  const pickColor = (c: (typeof fpColors)[number]) => { setColor(c); setActive(c.media); };
  const copyCode = () => {
    try { navigator.clipboard?.writeText("SAVE20"); } catch { /* clipboard unavailable */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  const trackStyle: CSSProperties = { transform: `translateX(calc(${active} * (-100% - 10px)))` };
  const accs = [
    {
      title: "Product Description",
      body: (<p>Stay comfortable and effortlessly stylish with the <strong>Drift Crew Sweatshirt</strong>, a versatile everyday essential designed for relaxed, modern dressing. Made with a soft and cozy feel, this classic crew-neck sweatshirt offers comfortable wear while maintaining a clean, contemporary silhouette.</p>),
    },
    {
      title: "Clothing Care Instructions",
      body: (
        <ul className="fp-care">
          <li><strong>Machine Wash Cold:</strong> Wash with similar colors on a gentle cycle.</li>
          <li><strong>Do Not Bleach:</strong> Avoid bleach and harsh chemicals to protect fabric quality.</li>
          <li><strong>Tumble Dry Low:</strong> Use a low-heat setting or air dry when possible.</li>
          <li><strong>Iron Low:</strong> Iron inside out using low to medium heat.</li>
          <li><strong>Do Not Dry Clean:</strong> Avoid dry cleaning unless specifically recommended.</li>
          <li><strong>Store Properly:</strong> Fold or hang garments in a cool, dry place away from direct sunlight.</li>
        </ul>
      ),
    },
  ];
  return (
    <section className="fp">
      <div className="fp-media">
        <div className="fp-gal">
          <div className="fp-rail">
            <div className="fp-rail-in">
              {fpMedia.map((m, i) => (
                <button key={m} className={`fp-thumb${i === active ? " on" : ""}`} onClick={() => setActive(i)} aria-label={`Open media ${i + 1}`}>
                  <img src={m} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
          <div className="fp-view">
            <div className="fp-track" style={trackStyle}>
              {fpMedia.map((m) => (
                <div className="fp-slide" key={m}><img src={m} alt="Drift Crew Sweatshirt" loading="lazy" /></div>
              ))}
            </div>
            <div className="fp-arrows">
              <button onClick={() => go(-1)} aria-label="Previous slide">{fpArrowL}</button>
              <button onClick={() => go(1)} aria-label="Next slide">{fpArrowR}</button>
            </div>
          </div>
        </div>
        <div className="fp-gal-mob">
          <div className="fp-track" style={trackStyle}>
            {fpMedia.map((m) => (
              <div className="fp-slide" key={m}><img src={m} alt="Drift Crew Sweatshirt" loading="lazy" /></div>
            ))}
          </div>
          <button className="fp-mob-arrow prev" onClick={() => go(-1)} aria-label="Previous slide">{fpArrowL}</button>
          <button className="fp-mob-arrow next" onClick={() => go(1)} aria-label="Next slide">{fpArrowR}</button>
        </div>
      </div>
      <div className="fp-info">
        <div className="fp-info-in">
          <div className={`fp-disc${discOpen ? " open" : ""}`}>
            <button className="fp-disc-head" onClick={() => setDiscOpen(!discOpen)} aria-expanded={discOpen}>
              <span>Where&apos;s The Discount?</span>
              <svg className="fp-disc-chev" width="12" height="12" viewBox="0 0 9 6" fill="none" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M0 0.708 0.708 0 4.354 3.647 8 0 8.707 0.708 4.354 5.061 0 0.708Z" fill="currentColor" /></svg>
            </button>
            <div className="fp-disc-body">
              <div className="fp-disc-in">
                <button className="fp-coupon" onClick={copyCode} aria-label="Copy code SAVE20">
                  <span className="fp-coupon-code">SAVE20</span>
                  {copied
                    ? <span className="fp-copied">Copied!</span>
                    : <svg width="14" height="14" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M1.95192 10.9154H6.87876C7.82586 10.9154 8.60245 10.2048 8.72389 9.29036H9.04542C10.0764 9.29036 10.9154 8.45143 10.9154 7.42048V1.95192C10.9154 0.920964 10.0764 0.0820312 9.04548 0.0820312H4.11859C3.08763 0.0820312 2.2487 0.920964 2.2487 1.95192V2.2487H1.95192C0.920964 2.2487 0.0820312 3.08763 0.0820312 4.11859V9.04542C0.0820312 10.0764 0.920964 10.9154 1.95192 10.9154ZM3.33203 1.95192C3.33203 1.51821 3.68487 1.16536 4.11859 1.16536H9.04542C9.47919 1.16536 9.83203 1.51821 9.83203 1.95192V7.42042C9.83203 7.85419 9.47919 8.20703 9.04548 8.20703H8.7487V4.11859C8.7487 3.08763 7.90976 2.2487 6.87881 2.2487H3.33203V1.95192ZM1.16536 4.11859C1.16536 3.68487 1.51821 3.33203 1.95192 3.33203H6.87876C7.31252 3.33203 7.66536 3.68487 7.66536 4.11859V9.04542C7.66536 9.47919 7.31252 9.83203 6.87881 9.83203H1.95192C1.51821 9.83203 1.16536 9.47919 1.16536 9.04548V4.11859Z" fill="currentColor" /></svg>}
                </button>
                <p className="fp-coupon-text">Buy 2, get $20 off by using this code</p>
              </div>
            </div>
          </div>
          <div className="fp-card">
            <h2 className="fp-title"><a href="/products/drift-crew-sweatshirt">Drift Crew Sweatshirt</a></h2>
            <p className="fp-desc">Wear it on its own for a laid-back look or layer it over a tee or under a jacket when the temperature drops.</p>
            <p className="fp-price"><span>$104.00</span><s>$120.00</s></p>
            <div className="fp-model">The model is 173 cm tall and is wearing size S</div>
            <div className="fp-vars">
              <div className="fp-var">
                <p className="fp-vlabel"><b>Color:</b> {color.name}</p>
                <div className="fp-swatches">
                  {fpColors.map((c) => (
                    <button key={c.name} className={`fp-swatch${c.name === color.name ? " on" : ""}`} style={{ background: c.hex }} onClick={() => pickColor(c)} aria-label={c.name} title={c.name} />
                  ))}
                </div>
              </div>
              <div className="fp-var">
                <p className="fp-vlabel"><b>Size:</b> {size}</p>
                <div className="fp-sizes">
                  {["XS", "S", "M", "L", "XL"].map((s) => (
                    <button key={s} className={s === size ? "on" : ""} onClick={() => setSize(s)}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
            <p className="fp-stock">
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle opacity="0.3" cx="7" cy="7" r="7" fill="currentColor" /><circle cx="7" cy="7" r="3" fill="currentColor" /></svg>
              <span>100 in stock, Get yours today!</span>
            </p>
            <div className="fp-buyrow">
              <div className="fp-qty">
                <button onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1} aria-label="Decrease quantity">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M9.5 6H1V4.5H9.5V6Z" fill="currentColor" /></svg>
                </button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)} aria-label="Increase quantity">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M6 4.5H9.5V6H6V9.5H4.5V6H1V4.5H4.5V1H6V4.5Z" fill="currentColor" /></svg>
                </button>
              </div>
              <button className="fp-atc">Add to cart</button>
            </div>
            <div className="fp-pickup">
              <div className="fp-pickup-l">
                <svg width="20" height="20" viewBox="0 0 19 19" fill="none" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M5.4121 7.57226e-07H13.4004C13.899 -1.67428e-05 14.3225 -2.55257e-05 14.6724 0.0361557C15.045 0.0746732 15.3893 0.158323 15.7146 0.359372C16.04 0.560421 16.2688 0.830997 16.4699 1.14702C16.6587 1.44384 16.848 1.8226 17.0711 2.2687L17.0855 2.29752C17.094 2.31453 17.1018 2.33191 17.1088 2.3496L18.3369 5.45423C18.4831 5.82364 18.645 6.28451 18.6924 6.75612C18.7408 7.23851 18.6743 7.79109 18.2963 8.27041C17.9872 8.6625 17.5573 8.95676 17.0625 9.09676V17.5H18.1562C18.5187 17.5 18.8125 17.7938 18.8125 18.1562C18.8125 18.5187 18.5187 18.8125 18.1562 18.8125H0.65625C0.293816 18.8125 0 18.5187 0 18.1562C0 17.7938 0.293816 17.5 0.65625 17.5H1.75V9.09685C1.25515 8.95676 0.82523 8.6625 0.516031 8.27041C0.138066 7.79109 0.0715925 7.2385 0.120032 6.75611C0.167387 6.2845 0.329341 5.82364 0.475475 5.45423L1.70363 2.3496C1.71063 2.33191 1.71839 2.31453 1.72691 2.29752L1.74134 2.26866C1.96436 1.82258 2.15372 1.44383 2.34258 1.14702C2.54366 0.830997 2.77246 0.560421 3.09777 0.359372C3.42307 0.158323 3.76741 0.0746732 4.13999 0.0361557C4.48992 -2.55257e-05 4.91338 -1.67428e-05 5.4121 7.57226e-07ZM14.6562 8.43281C14.9502 8.74414 15.3263 8.97715 15.75 9.09694V17.5H12.25V15.0656C12.25 14.6807 12.25 14.3488 12.2253 14.0765C12.1992 13.7884 12.1414 13.5032 11.9863 13.2344C11.8135 12.9351 11.5649 12.6865 11.2656 12.5137C10.9968 12.3586 10.7116 12.3008 10.4236 12.2747C10.1512 12.25 9.81925 12.25 9.43442 12.25H9.37807C8.99325 12.25 8.66127 12.25 8.38889 12.2747C8.10092 12.3008 7.81567 12.3586 7.54687 12.5137C7.24759 12.6865 6.99905 12.9351 6.82626 13.2344C6.67106 13.5032 6.61327 13.7884 6.58716 14.0765C6.56247 14.3488 6.56248 14.6807 6.5625 15.0655V17.5H3.0625V9.09694C3.48611 8.97706 3.86223 8.74414 4.15618 8.43281C4.59489 8.89752 5.21666 9.1875 5.90617 9.1875C6.59569 9.1875 7.21746 8.89752 7.65618 8.43281C8.09489 8.89752 8.71666 9.1875 9.40616 9.1875C10.0957 9.1875 10.7174 8.89752 11.1562 8.43281C11.5949 8.89752 12.2167 9.1875 12.9062 9.1875C13.5957 9.1875 14.2174 8.89752 14.6562 8.43281ZM7.875 17.5H10.9375V15.0937C10.9375 14.6728 10.9369 14.4009 10.9182 14.1949C10.9003 13.9979 10.8702 13.9264 10.8496 13.8906C10.792 13.7909 10.7091 13.708 10.6094 13.6504C10.5736 13.6298 10.5021 13.5997 10.3051 13.5818C10.0991 13.5631 9.82721 13.5625 9.40625 13.5625C8.98529 13.5625 8.71342 13.5631 8.50736 13.5818C8.3104 13.5997 8.23891 13.6298 8.20312 13.6504C8.10337 13.708 8.02051 13.7909 7.96294 13.8906C7.94229 13.9264 7.91219 13.9979 7.89434 14.1949C7.87561 14.4009 7.875 14.6728 7.875 15.0937V17.5ZM4.81242 6.78125C4.81242 7.38532 5.30211 7.875 5.90617 7.875C6.51024 7.875 6.99992 7.38532 6.99992 6.78125C6.99992 6.41882 7.29374 6.125 7.65617 6.125C8.01859 6.125 8.31241 6.41882 8.31241 6.78125C8.31241 7.38532 8.80215 7.875 9.40616 7.875C10.0103 7.875 10.4999 7.38532 10.4999 6.78125C10.4999 6.41882 10.7937 6.125 11.1562 6.125C11.5186 6.125 11.8124 6.41882 11.8124 6.78125C11.8124 7.38532 12.3021 7.875 12.9062 7.875C13.5103 7.875 13.9999 7.38532 13.9999 6.78125C13.9999 6.41882 14.2937 6.125 14.6562 6.125C15.0186 6.125 15.3124 6.41882 15.3124 6.78125C15.3124 7.38532 15.8021 7.875 16.4062 7.875C16.7544 7.875 17.0644 7.71304 17.2658 7.45767C17.3654 7.33127 17.4136 7.15832 17.3864 6.88725C17.3582 6.6054 17.2541 6.28491 17.1165 5.93703L15.8988 2.85897C15.6646 2.39054 15.5081 2.0803 15.3625 1.85161C15.2225 1.63161 15.1222 1.53617 15.0246 1.47585C14.9271 1.41554 14.7968 1.36851 14.5374 1.34169C14.2629 1.31331 13.9078 1.3125 13.3681 1.3125H5.44437C4.90466 1.3125 4.54947 1.31331 4.27498 1.34169C4.01561 1.36851 3.88538 1.41554 3.78779 1.47585C3.6902 1.53617 3.5899 1.63161 3.44991 1.85161C3.3044 2.0803 3.14786 2.39054 2.9136 2.85897L1.69595 5.93703C1.55833 6.28491 1.45427 6.6054 1.42596 6.88726C1.39874 7.15833 1.44695 7.33128 1.54664 7.45769C1.74799 7.71304 2.05796 7.875 2.40617 7.875C3.01024 7.875 3.49992 7.38532 3.49992 6.78125C3.49992 6.41882 3.79374 6.125 4.15617 6.125C4.51861 6.125 4.81242 6.41882 4.81242 6.78125Z" fill="currentColor" /></svg>
                <div>
                  <p className="fp-pickup-t"><b>Pickup available at</b> US Warehouse</p>
                  <p className="fp-pickup-s">Usually ready in 24 hours</p>
                </div>
              </div>
              <span className="fp-pickup-chev">
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M7.5 3.75 13.75 10 7.5 16.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </div>
            <div className="fp-accs">
              {accs.map((a, i) => (
                <div key={a.title} className={`fp-acc${openAcc === i ? " open" : ""}`}>
                  <button className="fp-acc-head" onClick={() => setOpenAcc(openAcc === i ? -1 : i)} aria-expanded={openAcc === i}>
                    <span>{a.title}</span>
                    <svg className="fp-plus" width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path className="fp-plus-v" d="M8 1v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                      <path d="M1 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                    </svg>
                  </button>
                  {openAcc === i ? <div className="fp-acc-body">{a.body}</div> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Lookbook carousel: piecewise-linear stop lookup, as in the demo JS. */
const lbcStop = (stops: [number, number][], v: number) => {
  if (v <= stops[0][0]) return stops[0][1];
  if (v >= stops[stops.length - 1][0]) return stops[stops.length - 1][1];
  for (let i = 0; i < stops.length - 1; i++) {
    const [x1, y1] = stops[i];
    const [x2, y2] = stops[i + 1];
    if (v >= x1 && v <= x2) return y1 + ((v - x1) / (x2 - x1)) * (y2 - y1);
  }
  return stops[stops.length - 1][1];
};
const LBC_OPACITY: [number, number][] = [[18, 0.3], [21, 0.3], [24, 0.35], [27, 0.5], [30, 0.6], [33, 1]];
const LBC_BLUR: [number, number][] = [[18, 3.5], [21, 3], [24, 2], [27, 1], [30, 0], [33, 0]];

/**
 * Lookbook carousel ("Spring Summer 2026"), rebuilt from the demo section
 * pasted by Tamal 2026-10-24 + lookbook-carousel.css /
 * component-lookbook-carousel.js:
 *  - desktop (>=1025): a tall wrapper whose height is the scroll distance
 *    (right-rail overflow or the left track's travel, whichever is larger)
 *    plus one viewport height, with a sticky 100dvh stage inside.
 *  - the left track is justified to the END and translates +X with scroll
 *    progress; each image's flex goes 33% -> 18% in 5% steps by its rank
 *    (block index - travel, travel = progress * (count - 1)), with the
 *    demo's opacity / blur stop tables applied to the flex value. The
 *    header sits absolute over the track at top 75px.
 *  - the right rail (300px, 350px at >=1200) hides its overflow and the
 *    10 product cards translate -Y by progress * their overflow.
 *  - mobile (<1025): a coverflow-style swipe row (slides 55.55% wide,
 *    neighbours scaled .85, active slide centred) synced to a sticky dark
 *    "Items in this look" panel that opens from "Shop this look" and
 *    shows the active look's two products.
 */
export function Lookbook() {
  const looks = lbcLooks;
  const count = looks.length;
  const outerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightViewRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const distRef = useRef(0);
  const [prog, setProg] = useState(0);
  const [dist, setDist] = useState(0);
  const [vh, setVh] = useState(0);
  const [travelPx, setTravelPx] = useState(0);
  const [rightOverflow, setRightOverflow] = useState(0);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const mWrapRef = useRef<HTMLDivElement>(null);
  const [mW, setMW] = useState(0);
  const [drag, setDrag] = useState<{ x: number; dx: number } | null>(null);
  const dragDxRef = useRef(0);

  /* desktop: measure the scroll distance, then track progress on scroll */
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const track = leftRef.current;
      const rTrack = rightRef.current;
      const rView = rightViewRef.current;
      if (!track || !rTrack || !rView || window.innerWidth < 1025) return;
      const slides = Array.from(track.children) as HTMLElement[];
      const tp = slides.length > 1 ? slides[slides.length - 1].offsetLeft - slides[0].offsetLeft : 0;
      const ro = Math.max(0, rTrack.scrollHeight - rView.clientHeight);
      setTravelPx(tp);
      setRightOverflow(ro);
      const d = Math.max(ro, tp, 1);
      distRef.current = d;
      setDist(d);
      setVh(window.innerHeight);
    };
    const update = () => {
      raf = 0;
      const outer = outerRef.current;
      if (!outer || window.innerWidth < 1025) return;
      if (!distRef.current) { measure(); return; }
      const top = outer.getBoundingClientRect().top;
      const p = top > 0 ? 0 : Math.min(1, Math.max(0, -top / distRef.current));
      setProg((prev) => (Math.abs(prev - p) > 0.0004 ? p : prev));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onResize = () => { measure(); update(); };
    measure();
    update();
    const t = setTimeout(measure, 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* slide offsets move as their flex changes with progress: re-measure */
  useEffect(() => {
    const track = leftRef.current;
    if (!track || window.innerWidth < 1025) return;
    const slides = Array.from(track.children) as HTMLElement[];
    if (slides.length > 1) {
      const tp = slides[slides.length - 1].offsetLeft - slides[0].offsetLeft;
      setTravelPx((prev) => (Math.abs(prev - tp) > 0.5 ? tp : prev));
    }
  });

  /* mobile: track width for the centred-slide offset */
  useEffect(() => {
    const upd = () => { if (mWrapRef.current) setMW(mWrapRef.current.clientWidth); };
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  const travel = prog * (count - 1);
  const slideW = mW / 1.8;
  const mOffset = (mW - slideW) / 2 - active * slideW + (drag ? drag.dx : 0);
  const onPD = (e: React.PointerEvent) => { dragDxRef.current = 0; setDrag({ x: e.clientX, dx: 0 }); };
  const onPM = (e: React.PointerEvent) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    dragDxRef.current = dx;
    setDrag({ x: drag.x, dx });
  };
  const onPU = () => {
    if (!drag) return;
    if (drag.dx < -50 && active < count - 1) setActive(active + 1);
    else if (drag.dx > 50 && active > 0) setActive(active - 1);
    setDrag(null);
  };
  const panelProducts = looks[active].products.map((i) => lbcProducts[i]);

  return (
    <section className="lbc">
      <div className="lbc-main" ref={outerRef} style={{ height: dist ? `${dist + vh}px` : "100dvh" }}>
        <div className="lbc-stage">
          <div className="lbc-left">
            <div className="lbc-head">
              <h2>Spring Summer 2026</h2>
              <p>Every piece of clothing is made to bring effortless style to everyday<br />moments. From relaxed essentials to standout layers, our collections<br />are designed for modern living.</p>
            </div>
            <div className="lbc-track" ref={leftRef} style={{ transform: `translate3d(${(prog * travelPx).toFixed(2)}px, 0, 0)` }}>
              {looks.map((l, i) => {
                const dataIndex = count - 1 - i;
                const rank = dataIndex - travel;
                let flex = 33;
                let op = 1;
                let blur = 0;
                let pe = "none";
                if (rank > 5) { flex = 18; op = 0; }
                else {
                  flex = rank < 0 ? 33 : Math.max(18, 33 - rank * 5);
                  op = lbcStop(LBC_OPACITY, flex);
                  blur = lbcStop(LBC_BLUR, flex);
                  pe = rank >= 0 && rank < 0.5 ? "auto" : "none";
                }
                const z = 4 - Math.round(Math.min(3, Math.max(0, rank)));
                return (
                  <div key={l.img} className="lbc-slide" style={{ flex: `0 0 ${flex}%`, opacity: op, zIndex: z, pointerEvents: pe as React.CSSProperties["pointerEvents"] }}>
                    <img src={l.img} alt="" loading="lazy" style={{ filter: `blur(${blur.toFixed(2)}px)` }} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="lbc-right" ref={rightViewRef}>
            <div className="lbc-products" ref={rightRef} style={{ transform: `translate3d(0, ${(-prog * rightOverflow).toFixed(2)}px, 0)` }}>
              {lbcProducts.map((p) => <ProductCard key={p.name} p={p} />)}
            </div>
          </div>
        </div>
      </div>
      <div className="lbc-mobile">
        <div
          className="lbc-mwrap"
          ref={mWrapRef}
          onPointerDown={onPD}
          onPointerMove={onPM}
          onPointerUp={onPU}
          onPointerLeave={onPU}
          onPointerCancel={onPU}
        >
          <div className="lbc-mtrack" style={{ transform: `translate3d(${mOffset.toFixed(2)}px, 0, 0)`, transition: drag ? "none" : "transform .45s cubic-bezier(.7, 0, .2, 1)" }}>
            {looks.map((l, i) => (
              <div
                key={l.img}
                className={`lbc-mslide${i === active ? " active" : ""}`}
                onClick={() => { if (Math.abs(dragDxRef.current) <= 8 && i !== active) setActive(i); }}
              >
                <div className="lbc-mslide-in">
                  <img src={l.img} alt="" loading="lazy" draggable={false} />
                  <div className="lbc-action">
                    <button type="button" onClick={(e) => { e.stopPropagation(); setActive(i); setOpen(true); }}>
                      Shop this look
                      <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true"><path d="M13.3346 5.83333C13.3346 4.94928 12.9834 4.10143 12.3583 3.47631C11.7332 2.85119 10.8854 2.5 10.0013 2.5C9.11725 2.5 8.2694 2.85119 7.64428 3.47631C7.01916 4.10143 6.66797 4.94928 6.66797 5.83333M1.66797 8.33333H18.3346L15.0013 17.5H5.0013L1.66797 8.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`lbc-panel${open ? " open" : ""}`}>
          <div className="lbc-panel-in">
            <button type="button" className="lbc-panel-head" onClick={() => setOpen(!open)} aria-expanded={open}>
              <span>
                <span className="lbc-panel-title">Items in this look</span>
                <span className="lbc-panel-desc">Put on your favorite items and get ready to rock</span>
              </span>
              <span className="lbc-chev">
                <svg width="11" height="7" viewBox="0 0 9 6" fill="none" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M0 0.708L0.708 0L4.354 3.647L8 0L8.707 0.708L4.354 5.061L0 0.708Z" fill="currentColor" /></svg>
              </span>
            </button>
            <div className="lbc-panel-clip">
              <div className="lbc-panel-body">
                {panelProducts.map((p) => (
                  <div className="lbc-mcard" key={p.name}>
                    <a href="/products/drift-crew-sweatshirt">
                      <img src={p.img} alt={p.name} loading="lazy" />
                      <span className="lbc-mcard-name">{p.name}</span>
                      <span className="lbc-mcard-price">${p.price.toFixed(2)}{p.compareAt ? <s>${p.compareAt.toFixed(2)}</s> : null}</span>
                    </a>
                    <button type="button">Add to cart</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Promotional bar (countdown), rebuilt from the demo section pasted by
 * Tamal 2026-10-24 + promotional-bar.css / component-countdown-timer.css /
 * countdown-timer.js:
 *  - light scheme-9 bar, spacers 30px (20px mobile), hidden below 768
 *  - one grid row at >=768: columns 1fr 1fr .8fr auto, column gap 60px
 *    (40px at 768-1024), row gap 16px, left-aligned; centred below 768
 *  - left: subheading "Dress Up Your Moments" (body size), 8px gap, then
 *    the h4 heading "Hurry, Your Style Won't Wait" (30px)
 *  - centre: countdown to the fixed due date 2027/09/25 (the demo's
 *    data-due-date), ticking every second; numbers are h3 (40px) white
 *    on dark #1a1a1a blocks (min-width 70px, 40px at <=1024, radius 5),
 *    blocks and h3-size colons in a row with 10px gaps; past the date
 *    the timer swaps to "Countdown expired"
 *  - right: the free-shipping description (demo line break), then a
 *    black "Shop Now" pill (44px tall) right-aligned, to /collections/all
 */
export function Countdown() {
  const DUE = new Date("2027/09/25").getTime();
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const upd = () => setLeft(Math.max(0, DUE - Date.now()));
    upd();
    const t = setInterval(upd, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  let units = ["335", "00", "32", "56"];
  if (left !== null) {
    const totalSec = Math.floor(left / 1000);
    units = [
      String(Math.floor(totalSec / 86400)),
      pad(Math.floor((totalSec % 86400) / 3600)),
      pad(Math.floor((totalSec % 3600) / 60)),
      pad(totalSec % 60),
    ];
  }
  return (
    <section className="promo">
      <div className="promo-wrap">
        <div className="promo-head">
          <p className="promo-sub">Dress Up Your Moments</p>
          <h2>Hurry, Your Style Won&rsquo;t Wait</h2>
        </div>
        <div className="promo-timer-wrap">
          {left !== null && left <= 0 ? (
            <p className="promo-expired">Countdown expired</p>
          ) : (
            <div className="promo-timer" role="timer">
              {units.map((u, i) => (
                <Fragment key={i}>
                  {i > 0 ? <span className="promo-colon">:</span> : null}
                  <span className="promo-block"><span className="promo-num">{u}</span></span>
                </Fragment>
              ))}
            </div>
          )}
        </div>
        <p className="promo-desc">All orders $25+ ship free within 1 business <br />day via USPS Priority Mail</p>
        <div className="promo-btn-wrap">
          <a className="promo-btn" href="/collections/all">Shop Now</a>
        </div>
      </div>
    </section>
  );
}

/**
 * Text with floating images (editorial statement), rebuilt from the demo
 * section pasted by Tamal 2026-10-24 + text-with-floating-images.css/.js:
 *  - spacers 100px (40px mobile); the demo's floating-bg.svg covers the
 *    section; content column max 800px (550px under 1025), centred
 *  - heading is h3-size (50px) bold with the demo's line breaks; the
 *    description follows with the demo's line break
 *  - media row starts 60px below the text (20px under 768): three square
 *    images (radius 10), column gap 40px (20px at 768-1199), max 1470px
 *  - scroll animation from the demo JS: progress runs 0 -> 1 while the
 *    section top travels from 50% of the viewport up to
 *    (viewport - 150 - section height); the FIRST and LAST images lerp
 *    (factor .22 per frame) from a displaced state (first: -2% of the
 *    section width, -40% of its height, scale .5, rotate -19.21deg;
 *    last: +2.5% width, -35% height, scale .3, rotate 23deg) back to
 *    rest as progress grows; the middle image never moves
 */
export function Editorial() {
  const ref = useRef<HTMLElement>(null);
  const firstRef = useRef<HTMLAnchorElement>(null);
  const lastRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    let raf = 0;
    let current = 0;
    let active = false;
    let metrics = { w: 0, h: 0, vh: 0, startY: 0, dist: 1 };
    const cache = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const startY = vh * 0.5;
      const endY = vh - 150 - rect.height;
      metrics = { w: rect.width, h: rect.height, vh, startY, dist: Math.max(1, startY - endY) };
    };
    const apply = (remaining: number) => {
      const { w, h } = metrics;
      const f = firstRef.current;
      const l = lastRef.current;
      if (f) f.style.transform = `translate3d(${(-w * 0.02 * remaining).toFixed(2)}px, ${(-h * 0.4 * remaining).toFixed(2)}px, 0) scale(${(1 - 0.5 * remaining).toFixed(4)}) rotateZ(${(-19.2102 * remaining).toFixed(3)}deg)`;
      if (l) l.style.transform = `translate3d(${(w * 0.025 * remaining).toFixed(2)}px, ${(-h * 0.35 * remaining).toFixed(2)}px, 0) scale(${(1 - 0.7 * remaining).toFixed(4)}) rotateZ(${(23 * remaining).toFixed(3)}deg)`;
    };
    const tick = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      if (rect.top > metrics.vh || rect.bottom < 0) { active = false; return; }
      const target = Math.min(1, Math.max(0, (metrics.startY - rect.top) / metrics.dist));
      const diff = target - current;
      if (Math.abs(diff) < 0.0001) {
        current = target;
        apply(1 - current);
        active = false;
        return;
      }
      current += diff * 0.22;
      apply(1 - current);
      raf = requestAnimationFrame(tick);
    };
    const start = () => { if (!active) { active = true; raf = requestAnimationFrame(tick); } };
    const io = new IntersectionObserver(() => { cache(); start(); }, { rootMargin: "200px 0px", threshold: 0 });
    io.observe(section);
    const onScroll = () => start();
    const onResize = () => { cache(); start(); };
    cache();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <section className="twf" ref={ref}>
      <img className="twf-bg" src={twfBg} alt="" loading="lazy" />
      <div className="twf-content">
        <h2>Discover fashion designed to <br />empower, inspire, and celebrate <br />your unique sense of style.</h2>
        <p>Made for real life, each piece blends everyday comfort with timeless style &amp; thoughtfully<br /> designed pieces that bring comfort and confidence to everyday dressing.</p>
      </div>
      <div className="twf-media">
        <a className="twf-img" href="/collections/all" ref={firstRef} aria-label="Floating image - 3"><img src={twfImgs[0]} alt="" loading="lazy" /></a>
        <a className="twf-img" href="/collections/all" aria-label="Floating image - 4"><img src={twfImgs[1]} alt="" loading="lazy" /></a>
        <a className="twf-img" href="/collections/all" ref={lastRef} aria-label="Floating image - 5"><img src={twfImgs[2]} alt="" loading="lazy" /></a>
      </div>
    </section>
  );
}

/* ---------- Social media gallery / Instagram ---------- */
/* Rebuilt from the demo section pasted by Tamal 2026-10-24 +
   social-media-gallery.css / .js (ScatterMarquee + SocialMediaPopup):
   - light scheme-9 section, spacers top 80 / bottom 60 (40 / 0 mobile)
   - desktop (>=768): cards start as a fanned deck of 5 in the centre;
     when the section scrolls into the top 40% of the viewport they
     scatter out to a row (0.5s, centre-out stagger) and the row becomes
     an RTL marquee (gap 20, speed 3 = 72px/s, pause on hover) with one
     clone group appended for the loop
   - card overlay (inset 10px): story thumbs slide the "View products"
     button up on hover; video cards play on hover; clicking a card
     opens the popup at that card
   - mobile (<768): swipe slider, 1.1 slides per view, non-active slides
     scaleY(.93), bullet pagination; each slide overlays the
     @sky_fashion profile and a free-scroll product row
   - popup: centred 440px drawer, radius 30, top profile header with
     gradient, story-style bar pagination at top 60px, swipe slider
     with the same slides and horizontal product cards */

function SmgProducts({ products, hideActions, popup }: { products: SmgProduct[]; hideActions?: boolean; popup?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState({ w: 100, x: 0 });
  const update = () => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) { setProg({ w: 100, x: 0 }); return; }
    const w = (el.clientWidth / el.scrollWidth) * 100;
    setProg({ w, x: (el.scrollLeft / max) * (100 - w) });
  };
  useEffect(() => { update(); }, []);
  return (
    <div className="smg-products-wrap">
      <div className={`smg-products${popup ? " in-popup" : ""}`} ref={ref} onScroll={update}>
        {products.map((p) => (
          <div className={`smg-hcard${products.length === 1 ? " single" : ""}`} key={p.name}>
            <span className="smg-hcard-media"><img src={p.img} alt="" loading="lazy" /></span>
            <span className="smg-hcard-info">
              <a href="/products/drift-crew-sweatshirt">{p.name}</a>
              <span className="smg-hcard-price">{p.from ? "From " : ""}${p.price.toFixed(2)}{p.compareAt ? <s>${p.compareAt.toFixed(2)}</s> : null}</span>
            </span>
            {!hideActions && (
              <button className="smg-atc" aria-label={`Add ${p.name} to cart`}>
                <svg viewBox="0 0 20 20" width="17" height="17" fill="none" aria-hidden="true"><path d="M13.3346 5.83333C13.3346 4.94928 12.9834 4.10143 12.3583 3.47631C11.7332 2.85119 10.8854 2.5 10.0013 2.5C9.11725 2.5 8.2694 2.85119 7.64428 3.47631C7.01916 4.10143 6.66797 4.94928 6.66797 5.83333M1.66797 8.33333H18.3346L15.0013 17.5H5.0013L1.66797 8.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="smg-progress"><i style={{ width: `${prog.w}%`, left: `${prog.x}%` }} /></div>
    </div>
  );
}

function SmgSlideOverlay({ card, hideActions, popup }: { card: SmgCard; hideActions?: boolean; popup?: boolean }) {
  return (
    <div className="smg-slide-overlay">
      {!popup && (
        <div className="smg-profile">
          <span className="smg-profile-media"><img src={smgAvatar} alt="" loading="lazy" /></span>
          <span className="smg-profile-title">@sky_fashion</span>
        </div>
      )}
      <SmgProducts products={card.products} hideActions={hideActions} popup={popup} />
    </div>
  );
}

function SmgSlideMedia({ card, active }: { card: SmgCard; active?: boolean }) {
  if (card.video) {
    return active
      ? <video className="smg-slide-video" src={card.video} poster={card.img} autoPlay muted loop playsInline />
      : <img src={card.img} alt="" loading="lazy" />;
  }
  return <img src={card.img} alt="" loading="lazy" />;
}

type SmgMetrics = { cardW: number; cardH: number; gap: number; step: number; total: number; rowStart: number; scrollDist: number; duration: number; containerW: number };

function smgMeasure(containerW: number): SmgMetrics {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1910;
  const cardW = vw >= 1025 ? 235 : 160;
  const gap = 20;
  const step = cardW + gap;
  const total = smgCards.length * step;
  const rowStart = containerW / 2 - (total - gap) / 2;
  const k = Math.max(1, Math.ceil(containerW / total));
  const scrollDist = k * total;
  return { cardW, cardH: (cardW * 4) / 3, gap, step, total, rowStart, scrollDist, duration: scrollDist / 72, containerW };
}

function smgDeckTransform(i: number, m: SmgMetrics): string {
  if (i < 5) {
    const factor = 2 - i;
    const ratio = (4 - i) / 4;
    const x = m.containerW / 2 - m.cardW / 2 + factor * 15;
    return `translate3d(${x}px, ${ratio * ratio * 24}px, 0px) rotate(${ratio * 16}deg) scale(0.92)`;
  }
  return `translate3d(${m.rowStart + i * m.step + m.containerW}px, 0px, 0px) rotate(0deg) scale(1)`;
}

function smgScatterDelay(i: number): number {
  const stagger = 0.5 * 0.035;
  if (i < 4) return (3 - i) * stagger;
  return 0.5 * 0.6 + (i - 4) * stagger;
}

export function Instagram() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoTimers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});
  const [phase, setPhase] = useState<"deck" | "scattering" | "running">("deck");
  const [metrics, setMetrics] = useState<SmgMetrics | null>(null);
  const [hoverPause, setHoverPause] = useState(false);
  const [popupIdx, setPopupIdx] = useState<number | null>(null);
  const [dragX, setDragX] = useState(0);
  const dragState = useRef<{ x: number; active: boolean }>({ x: 0, active: false });
  const [mobActive, setMobActive] = useState(0);
  const mobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const measure = () => setMetrics(smgMeasure(el.clientWidth));
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) setPhase((p) => (p === "deck" ? "scattering" : p));
    }, { rootMargin: "0px 0px -60% 0px", threshold: 0 });
    io.observe(el);
    return () => { window.removeEventListener("resize", onResize); io.disconnect(); };
  }, []);

  useEffect(() => {
    if (phase !== "scattering") return;
    const t = setTimeout(() => setPhase("running"), 1000);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (popupIdx === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPopupIdx(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [popupIdx]);

  const openPopup = (i: number) => { if (phase === "running") setPopupIdx(i); };

  const videoHover = (i: number, enter: boolean, el: HTMLElement) => {
    const video = el.querySelector("video");
    if (!video) return;
    if (enter) {
      videoTimers.current[i] = setTimeout(() => { video.play().catch(() => {}); }, 50);
    } else {
      clearTimeout(videoTimers.current[i]);
      video.pause();
      video.currentTime = 0;
    }
  };

  const renderCard = (card: SmgCard, idx: number, clone: boolean) => {
    const m = metrics;
    let style: CSSProperties = {};
    if (phase !== "running" && m) {
      if (clone) {
        style = { transform: `translate3d(${m.rowStart + idx * m.step + m.containerW}px, 0px, 0px)`, opacity: 0, pointerEvents: "none", width: m.cardW };
      } else if (phase === "deck") {
        style = { transform: smgDeckTransform(idx, m), width: m.cardW, zIndex: idx < 5 ? 10 + idx : 1, pointerEvents: idx < 5 ? "auto" : "none" };
      } else {
        style = { transform: `translate3d(${m.rowStart + idx * m.step}px, 0px, 0px) rotate(0deg) scale(1)`, width: m.cardW, transition: `transform .5s cubic-bezier(.16,1,.3,1) ${smgScatterDelay(idx)}s`, zIndex: idx < 5 ? 10 + idx : 1 };
      }
    }
    return (
      <div
        className="smg-card"
        key={`${clone ? "clone" : "card"}-${idx}`}
        aria-hidden={clone || undefined}
        style={style}
        onClick={() => openPopup(idx)}
        onMouseEnter={(e) => videoHover(idx, true, e.currentTarget)}
        onMouseLeave={(e) => videoHover(idx, false, e.currentTarget)}
      >
        <div className="smg-card-inner">
          {card.video
            ? <><img className="smg-poster" src={card.poster} alt="" loading="lazy" /><video src={card.video} muted loop playsInline preload="metadata" poster={card.poster} /></>
            : <img src={card.img} alt="" loading="lazy" />}
        </div>
        <div className="smg-card-overlay">
          <div className="smg-card-overlay-inner">
            <div className="smg-story">
              {card.products.map((p) => (
                <span className="smg-story-item" key={p.name}><img src={p.thumb} alt="" loading="lazy" /></span>
              ))}
            </div>
            <button type="button" className="smg-view-btn" onClick={(e) => { e.stopPropagation(); openPopup(idx); }}>View products</button>
          </div>
        </div>
      </div>
    );
  };

  const mobScrollTo = (i: number) => {
    const el = mobRef.current;
    if (!el) return;
    const slide = el.children[i] as HTMLElement | undefined;
    if (slide) el.scrollTo({ left: slide.offsetLeft - 16, behavior: "smooth" });
  };
  const mobOnScroll = () => {
    const el = mobRef.current;
    if (!el) return;
    let best = 0; let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const d = Math.abs((child as HTMLElement).offsetLeft - 16 - el.scrollLeft);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    setMobActive(best);
  };

  const popupDragStart = (x: number) => { dragState.current = { x, active: true }; };
  const popupDragMove = (x: number) => { if (dragState.current.active) setDragX(x - dragState.current.x); };
  const popupDragEnd = () => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    if (popupIdx !== null) {
      if (dragX < -60) setPopupIdx((popupIdx + 1) % smgCards.length);
      else if (dragX > 60) setPopupIdx((popupIdx - 1 + smgCards.length) % smgCards.length);
    }
    setDragX(0);
  };

  const trackVars = metrics ? ({
    "--smg-start": `${metrics.rowStart}px`,
    "--smg-end": `${metrics.rowStart - metrics.scrollDist}px`,
    "--smg-dur": `${metrics.duration}s`,
    height: metrics.cardH,
  } as CSSProperties) : undefined;

  return (
    <section className="smg" ref={sectionRef}>
      <div className="smg-head">
        <h2>Discover More on Instagram</h2>
        <p>Discover trending outfits and stylish picks loved by our <br />fashion community.</p>
      </div>

      <div
        className={`smg-marquee${phase === "running" ? " is-scattered" : ""}`}
        onMouseEnter={() => setHoverPause(true)}
        onMouseLeave={() => setHoverPause(false)}
      >
        <div
          className={`smg-track${phase === "running" ? " running" : ""}`}
          style={{ ...trackVars, animationPlayState: phase === "running" && (hoverPause || popupIdx !== null) ? "paused" : undefined }}
        >
          {smgCards.map((c, i) => renderCard(c, i, false))}
          {phase === "running" && smgCards.map((c, i) => renderCard(c, i, true))}
          {phase !== "running" && metrics && smgCards.map((c, i) => renderCard(c, i, true))}
        </div>
      </div>

      <div className="smg-mobile">
        <div className="smg-mtrack" ref={mobRef} onScroll={mobOnScroll}>
          {smgCards.map((c, i) => (
            <div className={`smg-mslide${i === mobActive ? " active" : ""}`} key={i}>
              <div className="smg-mslide-media"><SmgSlideMedia card={c} active={i === mobActive} /></div>
              <SmgSlideOverlay card={c} hideActions />
            </div>
          ))}
        </div>
        <div className="smg-dots">
          {smgCards.map((_, i) => (
            <button key={i} className={i === mobActive ? "active" : ""} aria-label={`Go to slide ${i + 1}`} onClick={() => mobScrollTo(i)} />
          ))}
        </div>
      </div>

      {popupIdx !== null && (
        <div className="smg-popup" role="dialog" aria-modal="true" aria-label="Social media gallery">
          <div className="smg-backdrop" onClick={() => setPopupIdx(null)} />
          <div className="smg-drawer">
            <div className="smg-popup-head">
              <div className="smg-profile">
                <span className="smg-profile-media"><img src={smgAvatar} alt="" /></span>
                <span className="smg-profile-title">@sky_fashion</span>
              </div>
              <button className="smg-close" aria-label="Close" onClick={() => setPopupIdx(null)}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true"><path d="M18.75 5.13496L5.25 18.8544" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M18.75 18.8544L5.25 5.13496" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
            <div className="smg-popup-bars">
              {smgCards.map((_, i) => (
                <button key={i} className={i === popupIdx ? "active" : ""} aria-label={`Go to slide ${i + 1}`} onClick={() => setPopupIdx(i)} />
              ))}
            </div>
            <div
              className="smg-popup-viewport"
              onPointerDown={(e) => popupDragStart(e.clientX)}
              onPointerMove={(e) => popupDragMove(e.clientX)}
              onPointerUp={popupDragEnd}
              onPointerLeave={popupDragEnd}
            >
              <div className="smg-popup-track" style={{ transform: `translate3d(${-popupIdx * 100}%, 0, 0) translate3d(${dragX}px, 0, 0)`, transition: dragX ? "none" : undefined }}>
                {smgCards.map((c, i) => (
                  <div className="smg-mslide popup-slide" key={i}>
                    <div className="smg-mslide-media"><SmgSlideMedia card={c} active={i === popupIdx} /></div>
                    <SmgSlideOverlay card={c} popup />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function Brands() {
  return (
    <section className="brands">
      <h3>Shop By Brand</h3>
      <div className="brands-grid">
        {brands.map((b, i) => (
          <a key={b} href="/collections/all"><b>{b}</b><span>{i % 2 ? "Collection Type" : "Curated Collection"} · {i % 3 === 0 ? "15 Products" : "10 Products"}</span></a>
        ))}
      </div>
    </section>
  );
}

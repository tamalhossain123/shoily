"use client";
import { useEffect, useState } from "react";
import { IMG } from "@/lib/data";

export function AnnouncementBar() {
  return (
    <div className="announce">
      <div className="announce-links">
        <a href="/">Home</a><a href="/collections/all">Shop</a><a href="/about">About Us</a>
      </div>
      <p className="announce-text">
        Big savings on everyday fashion only for a short time. <a href="/collections/all">Shop Now</a>
      </p>
      <div className="announce-locale">
        <span>USD ▾</span><span>EN ▾</span>
      </div>
    </div>
  );
}

function IconBtn({ label, children, onClick, badge }: { label: string; children: React.ReactNode; onClick?: () => void; badge?: string }) {
  return (
    <button className="icon-btn" aria-label={label} onClick={onClick}>
      {children}
      {badge ? <span className="icon-badge">{badge}</span> : null}
    </button>
  );
}

export function Header({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}${solid ? " solid" : ""}`}>
        <div className="header-left">
          <button className="icon-btn hamburger" aria-label="Menu" onClick={() => setMenuOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h12" /></svg>
          </button>
          <div className="mobile-search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <span>Search</span>
          </div>
        </div>
        <a className="logo" href="/">SHOILY</a>
        <div className="header-right">
          <IconBtn label="Search" onClick={() => setSearchOpen(true)}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          </IconBtn>
          <IconBtn label="Account">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 5-5.5 8-5.5s6.5 1.5 8 5.5" /></svg>
          </IconBtn>
          <IconBtn label="Bag" badge="1" onClick={() => setCartOpen(true)}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8h15l-1.5 12h-12L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
          </IconBtn>
        </div>
        <nav className="mega-nav">
          <a href="/">Home</a>
          <div className="mega-item">
            <a href="/collections/all">Shop ▾</a>
            <div className="mega-panel">
              <div className="mega-col"><b>By Category</b><a href="/collections/all">Sweaters</a><a href="/collections/all">Shirts</a><a href="/collections/all">Jeans</a><a href="/collections/all">Polos</a><a href="/collections/all">Trousers</a></div>
              <div className="mega-col"><b>Collections</b><a href="/collections/all">Elegant Looks</a><a href="/collections/all">Heritage</a><a href="/collections/all">The New Edit</a><a href="/collections/all">Daily Edit</a><a href="/collections/all">Current Classics</a></div>
              <div className="mega-col"><b>Help</b><a href="/faq">FAQ</a><a href="/contact">Contact</a><a href="/about">About Us</a><a href="/blogs">Journal</a></div>
              <a className="mega-feat" href="/products/drift-crew-sweatshirt"><img src={IMG.pro1a} alt="" /><span><b>Drift Crew Sweatshirt</b><small>$104.00 · Best Seller</small></span></a>
            </div>
          </div>
          <a href="/collections/all">Collections</a>
          <a href="/about">About Us</a>
          <a href="/blogs">Blogs</a>
          <a href="/contact">Contact</a>
          <a href="/faq">FAQ</a>
        </nav>
      </header>

      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)}>
          <aside className="drawer drawer-left" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head"><span className="logo dark">SHOILY</span>
              <button className="icon-btn plain" aria-label="Close" onClick={() => setMenuOpen(false)}>✕</button></div>
            <p className="drawer-label">Menu</p>
            <nav className="menu-links">
              <a className="active" href="/">Home</a><a href="/collections/all">Shop ›</a><a href="/about">About Us</a>
              <a href="/collections/all">Collections</a><a href="/collections/all">Catalog</a><a href="/collections/all">Lookbook</a>
              <a href="/blogs">Blogs</a><a href="/contact">Contact</a><a href="/faq">FAQ</a>
            </nav>
            <a className="menu-promo" href="/collections/all">
              <img src={IMG.sm8} alt="" />
              <span><b>Summer Sale</b><small>Up to 40% off selected styles</small></span>
              <span className="menu-promo-btn">Shop Now</span>
            </a>
            <p className="drawer-label">Popular Categories</p>
            <div className="menu-cats">
              {["Elegant Looks", "Heritage", "The New Edit", "Outerwear", "Premium Jacket"].map((c) => (
                <a key={c} href="/collections/all" className="menu-cat"><img src={IMG.lc1} alt="" /><span>{c}</span><span>›</span></a>
              ))}
            </div>
          </aside>
        </div>
      )}

      {searchOpen && (
        <div className="overlay search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-sheet" onClick={(e) => e.stopPropagation()}>
            <form className="search-bar" action="/search">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <input name="q" placeholder="Searching for..." autoFocus />
              <button type="button" className="search-x" aria-label="Close" onClick={() => setSearchOpen(false)}>✕</button>
            </form>
            <p className="drawer-label">POPULAR CATEGORIES</p>
            <div className="search-cats">
              {["Current Classics", "Daily Edit", "Elegant Looks", "Essential Collection"].map((c) => (
                <a key={c} href="/collections/all" className="search-cat"><img src={IMG.lc2} alt="" /><b>{c}</b><span>View collection ›</span></a>
              ))}
            </div>
            <div className="coupon-strip">
              <span>Hurry up! Summer Sale Ends Soon.</span>
              <code>SUMMER10</code>
              <button onClick={() => { navigator.clipboard?.writeText("SUMMER10"); setCopied(true); }}>{copied ? "Copied ✓" : "Copy"}</button>
            </div>
            <p className="drawer-label">SUGGESTIONS</p>
            <div className="search-sugg">
              {[["Drift Crew Sweatshirt", "$104.00", IMG.pro1a], ["Woven Stripe Top", "$104.00", IMG.pro1b], ["Heritage Knit Stripe Top", "$105.00", IMG.pro12]].map(([n, pr, im]) => (
                <div className="sugg" key={n}><img src={im} alt="" /><div><b>{n}</b><span>{pr}</span></div><button aria-label="Add">+</button></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <aside className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head"><h3>Your cart</h3>
              <button className="icon-btn plain dark" aria-label="Close" onClick={() => setCartOpen(false)}>✕</button></div>
            <div className="ship-box">
              <p>Spend <b>$29,896.00</b> more for FREE shipping</p>
              <div className="ship-track"><div className="ship-fill" /></div>
            </div>
            <div className="deal-tabs"><button className="active">Grab Deal</button><button>Hot Deals</button><button>New Deals</button></div>
            <p className="deal-note">Save 10% on the selected products</p>
            <div className="cart-item">
              <img src={IMG.pro1a} alt="Drift Crew Sweatshirt" />
              <div className="cart-item-info"><b>Drift Crew Sweatshirt</b><span>Maroon / XS</span>
                <div className="qty"><button>-</button><span>1</span><button>+</button></div></div>
              <div className="cart-item-right"><button className="trash" aria-label="Remove">🗑</button><b>$104.00</b></div>
            </div>
            <div className="cart-acc"><span>Order note</span><span>+</span></div>
            <div className="cart-acc"><span>Shipping</span><span>+</span></div>
            <div className="cart-acc"><span>Discount</span><span>+</span></div>
            <div className="cart-foot">
              <div className="cart-total"><b>Estimated total</b><b>$104.00 USD</b></div>
              <p>Taxes, discounts and shipping calculated at checkout.</p>
              <div className="cart-btns"><a className="btn outline" href="/cart">View Cart</a><button className="btn primary">Go To Checkout</button></div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export function MobileDock() {
  return (
    <nav className="mobile-dock">
      <a href="/collections/all" className="active"><span>⌂</span>Home</a>
      <a href="/collections/all"><span>☰</span>Menu</a>
      <a href="/collections/all"><span>👤</span>Account</a>
      <a href="/collections/all"><span>🛍</span>Cart<b className="dock-badge">1</b></a>
    </nav>
  );
}

export function Footer() {
  const cols: [string, string[]][] = [
    ["QUICK LINKS", ["Home", "About", "Contact", "All collections", "Blogs"]],
    ["BEST COLLECTIONS", ["Casual Collection", "Current Classics", "Daily Edit", "Modern Basics", "Heritage"]],
    ["HELP & SUPPORT", ["Contact", "Legal Notice", "Refund Policy", "Privacy Policy", "FAQ"]],
  ];
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-news">
          <h4>JOIN OUR NEWSLETTER</h4>
          <p>Be the first to know about new collections and exclusive offers.</p>
          <form className="news-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email address" aria-label="Email address" />
            <button aria-label="Subscribe">→</button>
          </form>
        </div>
        {cols.map(([title, links]) => (
          <div className="footer-col" key={title}>
            <h4>{title}<span className="footer-chev">▾</span></h4>
            <ul>{links.map((l) => <li key={l}><a href="/collections/all">{l}</a></li>)}</ul>
          </div>
        ))}
        <div className="footer-col">
          <h4>CONTACT</h4>
          <p className="footer-contact">1450 Market Street, Suite 600, San Francisco, CA 94103, United States</p>
          <a href="/collections/all" className="dot-link"><i />Get in Touch</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>USD ▾ &nbsp; EN ▾</span>
        <span>© 2026, Shoily</span>
        <span className="pay-icons">VISA · MC · AMEX · PayPal</span>
      </div>
    </footer>
  );
}

"use client";
import { useState } from "react";
import { AnnouncementBar, Header, Footer, MobileDock } from "@/components/chrome";
import { IMG, dressUp } from "@/lib/data";

export default function CartPage() {
  const [qty, setQty] = useState(1);
  const [openAcc, setOpenAcc] = useState(-1);
  const price = 104;
  return (
    <>
      <AnnouncementBar />
      <Header solid />
      <main className="inner-page cart-page">
        <h1>Your cart</h1>
        <div className="ship-box wide">
          <p>Spend <b>$29,896.00</b> more for FREE shipping</p>
          <div className="ship-track"><div className="ship-fill" /></div>
        </div>
        <div className="cart-layout">
          <div className="cart-lines">
            <div className="cart-item big">
              <img src={IMG.pro1a} alt="Drift Crew Sweatshirt" />
              <div className="cart-item-info">
                <b>Drift Crew Sweatshirt</b><span>Maroon / XS</span>
                <div className="qty"><button onClick={() => setQty(Math.max(1, qty - 1))}>-</button><span>{qty}</span><button onClick={() => setQty(qty + 1)}>+</button></div>
              </div>
              <div className="cart-item-right"><button className="trash" aria-label="Remove">🗑</button><b>${(price * qty).toFixed(2)}</b></div>
            </div>
            <h3 className="pairs-title">You may also like</h3>
            <div className="pairs">
              {dressUp.slice(0, 3).map((p) => <div className="pair" key={p.name}><img src={p.img} alt="" /><span>{p.name}</span><b>${p.price.toFixed(2)}</b></div>)}
            </div>
          </div>
          <aside className="order-summary">
            <h3>Order summary</h3>
            <div className="os-row"><span>Subtotal</span><b>${(price * qty).toFixed(2)} USD</b></div>
            <button className="cart-acc btnlike" onClick={() => setOpenAcc(openAcc === 0 ? -1 : 0)}><span>Order note</span><span>{openAcc === 0 ? "−" : "+"}</span></button>
            {openAcc === 0 && <textarea className="acc-body" placeholder="Add a note for your order (gift wrap, delivery note)..." rows={3} />}
            <button className="cart-acc btnlike" onClick={() => setOpenAcc(openAcc === 1 ? -1 : 1)}><span>Shipping</span><span>{openAcc === 1 ? "−" : "+"}</span></button>
            {openAcc === 1 && <p className="acc-body">Dhaka 24-48h, outside Dhaka 2-4 days. Free delivery on 2+ items, COD available in all 64 districts.</p>}
            <button className="cart-acc btnlike" onClick={() => setOpenAcc(openAcc === 2 ? -1 : 2)}><span>Discount</span><span>{openAcc === 2 ? "−" : "+"}</span></button>
            {openAcc === 2 && <div className="acc-body row"><input placeholder="Discount code" /><button className="btn primary">Apply</button></div>}
            <div className="os-row total"><span>Estimated total</span><b>${(price * qty).toFixed(2)} USD</b></div>
            <p className="os-note">Taxes, discounts and shipping calculated at checkout.</p>
            <button className="btn primary full">Go To Checkout</button>
            <a className="continue" href="/collections/all">Continue Shopping</a>
          </aside>
        </div>
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}

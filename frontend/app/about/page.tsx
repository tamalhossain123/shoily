import { AnnouncementBar, Header, Footer, MobileDock } from "@/components/chrome";
import { IMG } from "@/lib/data";

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <Header solid />
      <main className="inner-page about-page">
        <section className="about-hero">
          <div>
            <h1>Our Story</h1>
            <p>Shoily started with a simple frustration: clothes that looked great online but disappointed in real life. Thin fabric, prints that faded in two washes, sizes that never matched the chart.</p>
            <p>So we decided to make the t-shirt we always wanted to buy. Heavyweight 240+ GSM combed cotton, bio-washed so it never shrinks, and prints that stay sharp wash after wash. Every piece is checked by hand before it leaves our Dhaka studio.</p>
            <p>Today Shoily delivers across all 64 districts of Bangladesh, with cash on delivery and a size exchange promise we actually keep. Your Reliable Style Partner is not just a tagline, it is how we run the shop.</p>
            <a className="btn primary" href="/collections/all">Shop The Collection</a>
          </div>
          <img src={IMG.hero} alt="Shoily story" />
        </section>
        <section className="about-values">
          {[["240+ GSM Fabric", "Heavyweight combed cotton that holds its shape and feels premium from day one."],
            ["50+ Wash Print", "Japanese ultra-HD DTF print, tested to stay like new through 50+ washes."],
            ["Easy Exchange", "Wrong size? We exchange it, no drama. That is the Shoily promise."]].map(([t, d]) => (
            <div className="value-card" key={t}><h3>{t}</h3><p>{d}</p></div>
          ))}
        </section>
        <section className="about-stores">
          <div className="store-card"><img src={IMG.lc3} alt="" /><div><h3>Dhaka Studio</h3><p>Badda, Dhaka 1212<br />Open every day, 10am to 9pm</p></div></div>
          <div className="store-card"><img src={IMG.lc5} alt="" /><div><h3>Online Store</h3><p>Cash on delivery, all 64 districts<br />WhatsApp orders: 01567997270</p></div></div>
        </section>
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}

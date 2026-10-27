import { AnnouncementBar, Header, Footer, MobileDock } from "@/components/chrome";
import { IMG } from "@/lib/data";

export default function BlogPostPage() {
  return (
    <>
      <AnnouncementBar />
      <Header solid />
      <main className="inner-page article-page">
        <p className="crumbs"><a href="/">Home</a> / <a href="/blogs">Journal</a> / Style Guide</p>
        <h1>How To Style Heavyweight Tees</h1>
        <p className="article-meta">Oct 12, 2026 · Style Guide · 4 min read</p>
        <img className="article-hero" src={IMG.sm1} alt="" />
        <div className="article-body">
          <h2>Start With The Fit</h2>
          <p>A heavyweight tee has structure, so fit matters more than with a thin shirt. Go true to size for a clean everyday look, or one size up if you want that relaxed, boxy silhouette. The 240+ GSM fabric drapes on the body instead of clinging, which is exactly what makes it look premium.</p>
          <h2>Three Looks That Always Work</h2>
          <p>First, the classic: white tee, dark jeans, clean sneakers. Second, layer it under an open overshirt with chinos for evenings. Third, tuck the front into tailored trousers and add a belt, the weight of the fabric keeps the tuck in place all day.</p>
          <h2>Care Keeps It Sharp</h2>
          <p>Wash inside out in cold water and dry in shade. Shoily prints are tested for 50+ washes, and bio-washed cotton means the size you buy is the size that stays. Treat it right and a heavyweight tee will outlast five fast-fashion ones.</p>
          <a className="btn primary" href="/collections/all">Shop Heavyweight Tees</a>
        </div>
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}

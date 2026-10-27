import { AnnouncementBar, Header, Footer, MobileDock } from "@/components/chrome";
import { Hero } from "@/components/hero";
import {
  Collections, FreshPicks, SplitBanners, Showcase, TabbedGrid, Hotspot,
  FeaturedProduct, Lookbook, Countdown, Editorial, Instagram, Brands,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <Collections />
        <FreshPicks />
        <SplitBanners />
        <Showcase />
        <TabbedGrid />
        <Hotspot />
        <FeaturedProduct />
        <Lookbook />
        <Countdown />
        <Editorial />
        <Instagram />
        <Brands />
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}

# Shoily (Sky clone) - Gap / Fix List

Source of truth for this list: Sky's official feature list on the Shopify Theme Store
page (supplied by Tamal, 2026-10-24) cross-checked against our current build.
Theme version noted there: Sky 1.0.2 (Oct 13, 2026), by Shine Dezign Infonet, $450.

Note: the pasted code Tamal sent is the Theme Store listing page (Shopify's own site),
NOT the Sky theme's source code. The theme's own Liquid/CSS/JS is not public; only the
live demo (skytheme-demo.myshopify.com) shows its behaviour. We recreate, never copy.

## Done in fix batch 1 (2026-10-24)
- Quick view modal on every product card (eye icon + Choose Options): image, price,
- Fix batch 2 (2026-10-24): menu drawer in-menu promo tile; collection filters functional (color/category/price actually filter, counts update); PDP size-guide modal with table; trust badges row on PDP; Recently viewed section on PDP.
  size pills, stock line, Add To Cart, link to full product page.
- Product page image lightbox/zoom (click main image).
- Sticky add-to-cart bar on product page after scrolling past the buy box
  (theme ships sticky-add-to-cart.css, so the real theme has this; our earlier
  desktop pass missed it).
- Cart page accordions now open: order note (gift wrap note), shipping info,
  discount code field.
- All dead "#" links replaced with real routes.

## Still open (official features not yet in our build)
Cart and checkout: cart notes in drawer, gift wrapping option, pre-order,
sign in with Shop, sticky cart behaviour polish.
Marketing: trust badges row, recently viewed section, promo popup (existence still
unconfirmed on demo), in-menu promos, back-in-stock alert, age verifier,
quantity pricing (Shopify Plus only, skip for Shoily).
Merchandising: product videos in gallery, size chart modal (we have accordion only),
before/after image slider, image rollover is done, combined listing (Plus, skip),
ingredients/usage info tabs (partially in Specifications).
Discovery: mega menu (ours is a simple drawer), infinite scroll option
(we use Load More, matching demo), swatch filters functional (modal UI exists,
filtering not wired), back-to-top button (present on homepage only - check inner pages).
Polish: side-by-side screenshot diff per section at 1440 / 768 / 390, scroll-linked
showcase + lookbook (currently click-driven), mobile menu drawer contents unverified.

## Shoily-specific (not from the theme)
BDT pricing, bKash/Nagad, COD checkout form, 64-district selector, free delivery on
2+ items logic, Custom Studio design upload, WhatsApp order button, real product
photos replacing demo placeholders, Supabase backend (products, orders, auth).

Fix batch 3 (2026-10-24): desktop mega menu added (Shop hover panel with category /
collection / help columns + featured product), Showcase and Lookbook are now
scroll-linked as well as click-driven. Remaining polish: per-section screenshot
diff at 1440/768/390 against the demo, with Tamal's review of biggest mismatches.

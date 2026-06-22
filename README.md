# Beach Borders Curbing & Landscape — New Website

A fast, modern, mobile-first website for Scott's curbing business. No frameworks, no build step — just three files. It loads instantly and is built to turn visitors into free-estimate calls.

## Files
- `index.html` — all the page content
- `styles.css` — the design
- `script.js` — small interactions (mobile menu, stat counters, form)
- `images/` — drop real job photos here

---

## What's better than the old site
- **Leads with the proof:** 35+ years, 5.0 Google rating, 1,700+ customers, "owners on every job" — all above the fold.
- **A "Styles & Colors" section** (profiles, color swatches, stamp patterns) — the #1 thing curbing shoppers want to see, and what the best national companies feature.
- **Clear 4-step process** so there are no surprises.
- **Strong, repeated call-to-action** ("Free Estimate") plus a tap-to-call button that sticks to the bottom on phones.
- **Local SEO built in:** every Grand Strand town, a Google Map, and `LocalBusiness` schema so Google can show the star rating and hours.
- **Loads in under a second** and looks great on any phone.

---

## Before it goes live — 2 quick things

### 1. Photos — DONE ✅
Real job photos were pulled from Scott's existing `/our-work` gallery: the hero shot, the social-share image, and 9 gallery photos (decorative curbing, flower beds, tree rings, river rock, mulch beds, palms, island beds, concrete walkways, stamped concrete) all live in `images/`. His real logo (recovered as a clean transparent PNG) is in the header and footer as `images/beach-borders-logo.png`. To swap any photo, just replace the file (`hero.jpg`, `job1.jpg`…`job9.jpg`) keeping the same name.

### 2. Connect the contact form (free, 5 minutes)
1. Go to **formspree.io**, sign up free, create a form.
2. Copy your form ID (looks like `xyzabcd`).
3. In `index.html` find `action="https://formspree.io/f/YOUR_FORM_ID"` and paste it in.
That's it — submissions email straight to Scott. (Until then, the form politely tells people to call.)

### 3. Double-check the details (optional polish)
- Phone numbers `(843) 283-4770` / `(843) 927-8905`, email `beachborders1@gmail.com`, and the Longs, SC address are all pulled from Scott's real info. Search `843` or `Moulton` in `index.html` to find them.
- Add the real **Facebook / Instagram** links in the footer (search for `aria-label="Facebook"`).
- The "reviews" section currently shows real, verifiable proof points (5.0 rating, 1,732 customers, licensed & insured) — **not** fake testimonials. When you have 2–3 actual Google reviews, paste them as `<blockquote class="review">` cards where the HTML comment marks the spot.

---

## How to put it online (pick one)

**Easiest — Netlify Drop (free):**
Go to **app.netlify.com/drop** and drag the whole `beach-borders-website` folder onto the page. Live in ~10 seconds with a free URL. Then point `beachborderscurbing.net` at it in the domain settings.

**Or any web host:** upload the three files + `images/` folder to the site's root via FTP/cPanel.

Want me to deploy it for you and wire up the domain? Just say the word.

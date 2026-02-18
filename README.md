# Señor Bigote Barberia — Website

A premium, dark-luxury barbershop website for **Señor Bigote Barberia**, located at **113 Dyckman Street, New York, NY 10040**. Established 2021.

---

## Overview

A fully custom-built static website designed with a cinematic, gentleman's aesthetic. Dark theme with gold accents, scroll-reveal animations, and WhatsApp-integrated booking.

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, CSS Grid, Flexbox, keyframe animations, mask-image gradients
- **Vanilla JavaScript** — No frameworks or dependencies
- **Google Fonts** — Playfair Display, Montserrat, Cormorant Garamond

## Features

- **Cinematic hero** — Full-bleed B&W portrait with vignette, gold corner accents, staggered entrance animations
- **Custom cursor** — Gold dot + ring cursor that expands on hover and reacts to clicks (desktop only)
- **Video interlude** — Looping razor close-up video between barbers and services sections with parallax
- **Barber profiles** — Individual cards with 3D tilt hover effect for Rafa, Luis "Champion", and Pito with direct booking
- **WhatsApp booking** — Form builds a pre-filled WhatsApp message with all appointment details
- **Booking confirmation messaging** — Clear notice that appointments are requests, not confirmed until shop replies
- **Interactive gallery** — 13-photo masonry grid with lightbox, keyboard navigation, hover zoom effects
- **Gold shimmer text** — Animated gradient shimmer on gold accent headings
- **Scroll animations** — IntersectionObserver-powered reveal effects with staggered delays
- **Parallax depth** — Multi-layer parallax on hero, video interlude, and storefront banner
- **Counter animations** — Animated stats (years, chairs, barbers)
- **Storefront banner** — Daytime storefront photo with text overlay and parallax above Google Map
- **Nighttime footer** — Storefront at night as moody background behind footer content
- **Responsive design** — Breakpoints at 1024px, 768px, 480px
- **WhatsApp integration** — Phone links throughout open WhatsApp directly
- **Social links** — Instagram (@senor_bigote_barberia), TikTok (@senorbigotebarberia)

## Services & Pricing

| Service | Price |
|---|---|
| Haircut & Shave | $45 |
| Haircut | $35 |
| Kids Haircut (under 10) | $25 |
| Shape Up & Shave | $25 |
| Shave | $20 |
| Eyebrows | $10 |

## Hours

| Day | Hours |
|---|---|
| Mon - Thu | 10:30 AM - 9:00 PM |
| Fri - Sat | 9:30 AM - 10:00 PM |
| Sunday | 12:00 PM - 8:00 PM |

## Contact

- **Phone/WhatsApp:** (347) 280-3188
- **Address:** 113 Dyckman Street, New York, NY 10040
- **Instagram:** [@senor_bigote_barberia](https://www.instagram.com/senor_bigote_barberia/)
- **TikTok:** [@senorbigotebarberia](https://www.tiktok.com/@senorbigotebarberia)

## Project Structure

```
Barbershop Website/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   └── images/
│       ├── barbers/
│       │   ├── rafa.jpg
│       │   ├── luis.jpg
│       │   └── pito.jpg
│       ├── gallery/
│       │   ├── tuxedo-gentleman.jpg
│       │   ├── fade-clean.jpg
│       │   ├── curly-fade.jpg
│       │   ├── wavy-texture.jpg
│       │   ├── sharp-fade.jpg
│       │   ├── locs-before-after.jpg
│       │   ├── textured-crop.jpg
│       │   ├── slick-sidepart.jpg
│       │   ├── braids-lineup.jpg
│       │   ├── before-after.jpg
│       │   ├── razor-work.jpg
│       │   ├── head-shave.jpg
│       │   └── classic-cut.jpg
│       ├── logos/
│       │   ├── logo-main.png
│       │   ├── logo-small.png
│       │   ├── logo-clean.png
│       │   └── logo-vintage.jpg
│       └── shop/
│           ├── storefront-day.jpg
│           ├── storefront-night.jpg
│           ├── storefront.jpg
│           ├── interior-bw.jpg
│           ├── owner-bigote.jpg
│           └── pricelist.jpg
├── assets/
│   └── videos/
│       ├── razor-closeup.mp4
│       └── beard-detail.mp4
└── README.md
```

## Design System

### Colors
| Token | Value | Usage |
|---|---|---|
| `--black` | `#0a0a0a` | Background |
| `--dark` | `#111111` | Cards, sections |
| `--gold` | `#c9a84c` | Accents, CTAs, highlights |
| `--white` | `#f5f5f5` | Primary text |
| `--gray-light` | `#b0b0b0` | Body text |

### Typography
- **Playfair Display** — Headings (serif, elegant)
- **Montserrat** — Body text (sans-serif, clean)
- **Cormorant Garamond** — Accent text, labels (serif, refined)

## Booking Flow

1. User fills out booking form (name, phone, barber, service, date, time)
2. Form builds a pre-filled WhatsApp message
3. Opens WhatsApp in new tab with message ready to send
4. Shop receives message and replies to confirm/reschedule
5. Clear messaging throughout that bookings are **requests**, not confirmed appointments

## Deployment (Vercel)

Hosted on **Vercel** as a static site — no build step required.

### Setup Steps

1. Initialize git repo and push to GitHub
2. Connect GitHub repo to Vercel
3. Deploy — Vercel auto-detects static site (no framework, no build command)
4. (Optional) Connect custom domain in Vercel dashboard

### Vercel Settings
- **Framework Preset:** Other
- **Build Command:** *(leave empty)*
- **Output Directory:** `.`
- **Install Command:** *(leave empty)*

## Future Enhancements

Planned features to build on over time:

- **Before & After slider** — Interactive drag slider to reveal haircut transformations (needs more before/after photo pairs)
- **Owner spotlight** — Dedicated section or page for the owner ("Señor Bigote" himself)
- **Additional video content** — More barbering footage for video backgrounds or a dedicated reel section
- **Online reviews integration** — Pull in Google/Yelp reviews
- **Multi-language support** — Spanish/English toggle for the Dyckman community
- **Blog/Tips section** — Grooming tips, style guides, product recommendations

---

*Built for Señor Bigote Barberia, 113 Dyckman Street, NYC.*

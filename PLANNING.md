# Shlomit Eitam — Clinical Psychologist Landing Page
## Project Planning & Design Decisions

---

## Project Overview

A bilingual (Hebrew/English) personal landing page for Shlomit Eitam, Senior Clinical Psychologist, published via GitHub Pages at [ephraimeitam/shlomit-psychologist](https://github.com/ephraimeitam/shlomit-psychologist).

**Goal:** Present Shlomit's professional profile warmly and credibly to prospective patients searching for a psychologist in Jerusalem.

---

## Requirements

| Requirement | Implementation |
|---|---|
| Content from resume PDF + photo | Extracted and written as professional copy |
| Bilingual Hebrew / English | JS i18n system with `data-i18n` attributes |
| Hebrew default | `<html lang="he" dir="rtl">` on load |
| Language switch | Toggle buttons in nav; swaps lang, dir, and all text |
| GitHub Pages compatible | Pure HTML/CSS/JS, no build step, `index.html` at root |
| Git workflow | Feature branches → PR to main |
| Warm & calm design | Earthy palette (sage green + terracotta + cream) |
| Adults/adolescents only | Children removed from services section per request |
| Contact: phone + email only | No contact form (can be added later) |

---

## Design Decisions

### Color Palette — Warm & Calm

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#FAF8F4` | Page background (warm cream) |
| `--bg-alt` | `#F0EAE0` | Alternate section background (warm linen) |
| `--primary` | `#7A9B8A` | Sage green — trust, calm, healing |
| `--primary-dark` | `#4E7060` | Hover states, headings |
| `--accent` | `#C9905A` | Terracotta — warmth, energy |
| `--text` | `#2C2420` | Warm near-black body text |
| `--text-mid` | `#6B5E57` | Secondary text |

**Rationale:** Sage green is widely associated with mental health and calm. Terracotta adds warmth and approachability without being clinical. Cream backgrounds feel softer than stark white.

### Typography

| Language | Headings | Body |
|---|---|---|
| Hebrew | Frank Ruhl Libre (classic Israeli serif) | Heebo (clean, modern, excellent Unicode coverage) |
| English | Playfair Display (elegant editorial serif) | Inter (neutral, highly legible) |

**Rationale:** Hebrew users see a font familiar from high-quality Israeli publications. English users get a timeless, professional look. Switching languages also switches fonts automatically via `html[lang]` selectors.

### Layout

- **Hero:** Split layout with organic blob-shaped photo frame. RTL/LTR direction naturally places content on the reading-start side and photo on the other.
- **About:** 2-column grid — narrative text + credential cards.
- **Services:** 3-column card grid with hover accent bar.
- **Background:** Vertical timeline with connector line.
- **Education:** 3-column card grid.
- **Contact:** 3 centered cards (phone, email, location).

### RTL/LTR Handling

CSS `direction` property (set by `html[dir]`) automatically reverses:
- Flexbox row direction
- Inline text alignment
- `border-inline-start` / `padding-inline-start` (logical properties)

Additional manual overrides used for:
- Hero image background blob positioning (`inset-inline-end`)
- Hero divider gradient direction

### Multilingual System

All text is stored in `js/translations.js` as a single object with `he` and `en` keys.  
Elements carry `data-i18n="key"` attributes. `setLanguage(lang)` in `main.js` iterates and replaces `textContent` for each element.

**Trade-offs considered:**
- **Server-side i18n** (separate HTML files): Better for SEO, more complex to maintain.
- **JS i18n (chosen):** Single file, simple to update, good enough for a personal site where SEO is secondary to usability.

### Scroll Animations

`IntersectionObserver` reveals cards and sections as they enter the viewport. Staggered `transitionDelay` gives a cascade effect. Observed elements are unobserved after first trigger (performance).

---

## File Structure

```
/
├── index.html              # Single-page app
├── css/
│   └── style.css           # All styles (responsive, RTL/LTR)
├── js/
│   ├── translations.js     # All Hebrew + English copy
│   └── main.js             # Language toggle, scroll, nav, animations
├── assets/
│   ├── photo.jpg           # Profile photo (renamed for URL safety)
│   ├── cv.pdf              # Full CV download (renamed for URL safety)
│   └── ...                 # Original files retained
└── PLANNING.md             # This document
```

---

## Content Decisions

- **Services excluded:** Children (per client request)
- **Services included:** Trauma & EMDR, Anxiety & Depression, Life Crises, Interpersonal Difficulties, Sexual Abuse Survivors, Group Therapy
- **Contact info shown:** Phone (054-7501781) + Email only. Home address omitted for privacy.
- **CV download:** Linked from Education section
- **Copy tone:** Professional yet warm; written in first person for Hebrew, third-person-intro style for English (common in professional bios)

---

## GitHub Pages Deployment

1. Ensure `index.html` is at root of `main` branch
2. In repo Settings → Pages → Source: `main` branch, `/ (root)`
3. Site will be live at: `https://ephraimeitam.github.io/shlomit-psychologist/`

---

## Future Enhancements (Out of Scope Now)

- Contact form (e.g., Formspree integration)
- Appointment booking widget
- Blog / articles section
- Google Analytics
- SEO meta tags (Open Graph, structured data)
- PWA manifest

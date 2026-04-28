# Design System Specification: Chiseled Ink

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Stonemason"**

This design system is inspired by chiseled stone, brutalist architecture, and high-contrast print media. It focuses on raw, irregular shapes, high-contrast "Ink and Paper" tones, and technical precision. Instead of smooth rounded corners, we use sharp angles and `clip-path` geometry to create a "hand-cut" feel.

---

## 2. Colors & Surface Philosophy
The system is built on a high-contrast foundation of `ink` and `paper`.

### The Palette
- **Primary (Accent Blue):** `#4DA3FF` — Used for selection, interactive states, and "electric" highlights.
- **Background (Paper):** `#F5F5F5` — The default light surface, reminiscent of recycled paper.
- **Surface (Ink):** `#111111` — Used for high-impact blocks, text, and containers.

### Surface Texture
The entire application must feature a subtle **Grain Texture Overlay** (8% opacity noise) to prevent "flat" digital surfaces and provide a tactile, analog feel.

---

## 3. Typography
The system uses a high-contrast dual-font setup.

- **Headings (Bebas Neue):** A bold, condensed sans-serif. 
    - **Rule:** Always uppercase.
    - **Rule:** Tight tracking (-0.02em) and extremely tight line-height (0.9).
- **Body (Inter):** A clean, technical sans-serif for high readability.

---

## 4. Geometry & Shapes
**The "Anti-Radius" Rule:** Standard CSS `border-radius` is strictly prohibited. 

- **Chiseled Blocks:** All containers must use `clip-path: polygon(...)` to create slightly irregular, non-parallel edges. 
- **Example Polygon:** `0.5% 1%, 99% 0%, 100% 98%, 1% 100%, 0% 2%`.
- **Misalignment:** Subtle rotation (1deg or -0.5deg) and translation should be applied to elements to simulate "manual placement."

---

## 5. Components & Animations

### Chisel Blocks
- **Dark Block:** `bg-ink`, `text-paper`, with chiseled clip-path.
- **Accent Block:** `bg-accent`, `text-ink`, with chiseled clip-path.

### Electric Borders
Used for high-priority call-to-actions. A rotating `conic-gradient` using the `accent` color creates a "running light" effect around the container.

### Mechanical Marquee
Horizontal scrolling text for technical metadata or branding. Must feel like a continuous ticker tape.

### Reveal Cut
Content should appear using "cut" transitions (`clip-path: inset(...)`) rather than standard fades.

---

## 6. Do's and Don'ts

### Do
- **Do** use large, "Huge" typography for section branding.
- **Do** allow text to overlap slightly with decorative elements.
- **Do** use heavy borders (8px) for major structural separations.

### Don't
- **Don't** use standard drop shadows. Use hard, offset "ink" blocks for depth.
- **Don't** use soft colors or pastels. Stick to the Ink/Paper/Accent trio.
- **Don't** use rounded corners (`border-radius`).

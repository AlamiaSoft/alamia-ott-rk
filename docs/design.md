Here is the updated **`design.md`** specifically tailored to match the regal, high-contrast **Gold & Onyx** visual identity from your logo.

---

# Design System Guidelines (`design.md`)

Welcome to the official Design System documentation for the OTT Streaming Platform. This document defines the core visual identity, color tokens, component guidelines, and layout rules derived directly from the brand’s signature **Gold Chess King** logo motif—evoking a luxury, premium, and exclusive content-viewing experience.

---

## 1. Brand Identity & Visual Philosophy

* **Regal & Premium Aesthetics:** Anchored by metallic gold tones and deep obsidian blacks, the platform communicates high quality, prestige, and curated storytelling.
* **Minimalist & Content-First:** Heavy contrast ensures posters, trailers, and UI controls remain clear while maintaining an elegant dark atmosphere.
* **Tactile Depth:** Subtle gold glow effects, linear gradients, and frosted dark glass elements bring depth to buttons and modal overlays.

---

## 2. Color Palette & Tokens

### Brand & Accent Colors (Logo Derived)

* **Primary Gold Accent:** `#E5A823` *(Rich Metallic Gold - Primary CTA buttons, active states)*
* **Light Gold / Highlight:** `#FFD768` *(Bright Gold - Hover states, glowing accents, badges)*
* **Dark Gold / Border:** `#9E7010` *(Deep Amber - Subdued borders, inactive indicators)*

### Neutral & Background Palette

* **Base Background (Obsidian):** `#0A0A0C` *(Ultra-deep black for maximum contrast)*
* **Surface 1 (Onyx Card):** `#141311` *(Slightly warm dark tone for poster containers)*
* **Surface 2 (Elevated Overlay):** `#1E1D19` *(Warm charcoal for modals, dropdowns, and player controls)*
* **Border Subtitle:** `#2E2A22` *(Subtle warm-gray border separator)*

### Text & Typography Colors

* **Text High Emphasis:** `#FFFFFF` *(Pure white for titles and primary readability)*
* **Text Gold Accent:** `#F0C050` *(Muted metallic text for subheaders and ratings)*
* **Text Muted:** `#A19E95` *(Warm neutral gray for secondary metadata)*

---

## 3. Typography

* **Primary Display Font:** `Cinzel` or `Cormorant Garamond` *(For promotional hero text, titles, and section headlines to match the chess royalty aesthetic)*
* **Body / UI Font:** `Inter` or `Plus Jakarta Sans` *(For clean, legibility-focused navigation, UI labels, and descriptions)*

### Type Scale

| Scale | Font Family | Size | Weight | Line Height | Usage |
| --- | --- | --- | --- | --- | --- |
| **Display Hero** | `Cinzel` / Serif | `52px` | Bold (`700`) | `1.1` | Hero Title Banners |
| **Heading 1** | `Cinzel` / Serif | `28px` | SemiBold (`600`) | `1.2` | Row / Category Titles |
| **Heading 2** | `Inter` / Sans | `20px` | Bold (`700`) | `1.3` | Movie Details Title |
| **Body Primary** | `Inter` / Sans | `15px` | Regular (`400`) | `1.5` | Synopsis / Plot Summaries |
| **Caption / Badge** | `Inter` / Sans | `12px` | Medium (`500`) | `1.2` | Duration, Ratings, Badges |

---

## 4. UI Components

### Buttons & Interactive Controls

#### Primary Play Button

* **Background:** Linear Gradient `135deg` (`#FFD768` to `#E5A823`)
* **Text Color:** `#0A0A0C` (Obsidian Black)
* **Font Weight:** `700` (Bold)
* **Hover State:** Glow effect `box-shadow: 0px 4px 20px rgba(229, 168, 35, 0.4)`
* **Border Radius:** `6px`

#### Secondary Action (Add to Watchlist / Details)

* **Background:** `rgba(255, 255, 255, 0.08)`
* **Border:** `1px solid rgba(229, 168, 35, 0.3)`
* **Text Color:** `#FFFFFF`
* **Hover State:** `border-color: #E5A823`, `background: rgba(229, 168, 35, 0.15)`

---

### Poster Cards & Carousels

* **Portrait Aspect Ratio:** `2:3` *(Standard Movie Poster)*
* **Landscape Aspect Ratio:** `16:9` *(Continue Watching & Video Previews)*
* **Card Border:** `1px solid #2E2A22`
* **Hover Animation:**
* `transform: translateY(-6px) scale(1.03);`
* `transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);`
* `box-shadow: 0px 12px 28px rgba(0, 0, 0, 0.8), 0px 0px 12px rgba(229, 168, 35, 0.2);`



---

### Badges & Metadata Chips

* **Premium / Exclusive Badge:**
* Background: `rgba(229, 168, 35, 0.12)`
* Border: `1px solid #E5A823`
* Text: `#FFD768`
* Text Style: Uppercase, `10px`, Tracking `1px`


* **Quality Tags (4K / HDR / Audio):**
* Border: `1px solid rgba(255, 255, 255, 0.2)`
* Text: `#A19E95`



---

## 5. Media Player UI

* **Bottom Control Bar:** Gradient overlay from `#0A0A0C` (100% opacity at bottom to 0% at top).
* **Scrubber Track:** `rgba(255, 255, 255, 0.2)`
* **Scrubber Active Progress:** `#E5A823` (Gold fill)
* **Scrubber Knob:** Circle with `#FFD768` glow on hover.
* **Volume & Control Icons:** High-contrast white `#FFFFFF` with `#E5A823` active states.
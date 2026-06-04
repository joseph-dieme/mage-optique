# Design System: Mage Optique & Services Digital Platform
**Project ID:** projects/4188088623941787775

## 1. Visual Theme & Atmosphere
This design system is engineered for a premium e-commerce experience, prioritizing clarity, precision, and high-end aesthetics. The brand personality is **sophisticated, professional, and intellectual**, mirroring the expertise of an optician.

The visual style is a blend of **Minimalism** and **Corporate Modern**. It utilizes expansive white space to suggest luxury, paired with editorial-grade typography that echoes the heritage of optical craftsmanship. The interface avoids unnecessary decoration, allowing the product photographyâ€”the frames and lensesâ€”to remain the focal point. Every interaction should feel deliberate and smooth, evoking the feeling of a high-end boutique concierge service.

## 2. Color Palette & Roles
The palette is anchored in a high-contrast foundation of **Deep Charcoal** (`#121212`) and **Paper White** (`#FFFFFF`), establishing an immediate sense of authority and timelessness.

*   **Primary Accent / Brand Color:** **Muted Gold** (`#C5A059`) - Used sparingly for call-to-action elements, focus states, and premium badges.
*   **Secondary Text / Borders:** **Soft Slate** (`#4A5568`) - Used for secondary text, metadata, and borders to maintain a softer visual hierarchy than pure black, ensuring the interface remains breathable and approachable despite its high-contrast nature.
*   **Base Surface / Background:** **Paper White** (`#FFFFFF` / `#f9f9f9`) - Establishes clean, spacious gallery backgrounds.
*   **Neutral Dark:** **Deep Charcoal** (`#121212`) - Used for solid dark elements, header text, and primary actions.

## 3. Typography Rules
This design system uses a dual-font strategy to balance editorial elegance with functional legibility.

*   **Display & Headlines:** **Playfair Display** (Serif) is the voice of the brand. It is used exclusively for headlines and hero statements. Its high contrast and classical letterforms reflect the "Mage Optique & Services" logo, signaling luxury and heritage.
*   **Body & Utility UI:** **Hanken Grotesk** (Sans-Serif) handles all functional and body content. It was chosen for its modern, geometric clarity and exceptional readability at small sizesâ€”crucial for technical lens specifications and e-commerce checkout flows. Labels and buttons use Hanken Grotesk with increased letter spacing and uppercase styling to evoke the "VOYEZ MIEUX" subtitle from the brand mark.

## 4. Component Stylings
*   **Buttons:**
    *   *Primary:* Deep Charcoal (`#121212`) background, White Hanken Grotesk uppercase text. No border.
    *   *Secondary:* Transparent background, 1px Soft Slate (`#4A5568`) border, Charcoal text.
    *   *Tertiary / Ghost:* No background or border, Muted Gold (`#C5A059`) text for subtle CTAs like "Learn More."
*   **Cards/Containers:**
    *   Minimum padding of 24px. The image should be on a light gray or neutral-white background to normalize different product photography. Title in Playfair Display, price in Hanken Grotesk.
    *   *Hover state:* Hover effects on product cards should trigger a very soft, diffused shadow (`0px 10px 30px rgba(0, 0, 0, 0.04)`) and a subtle transition.
*   **Inputs/Forms:**
    *   Clean, 1px border on the bottom only for a minimalist "form" look, or a full 4-sided border for high-utility areas like checkout. Focus state transitions the border to Muted Gold (`#C5A059`).
*   **Chips & Badges:**
    *   Small, uppercase labels with 0.05em letter spacing. Use Muted Gold (`#C5A059`) for "Premium" or "New" tags to draw the eye without disrupting the monochrome balance.

## 5. Layout Principles
The layout follows a **Fixed Grid** philosophy on desktop to maintain the "boutique" feel, centered with generous margins.

*   **Desktop (1280px+):** 12-column grid, 24px gutters, 64px minimum side margins.
*   **Tablet (768px - 1279px):** 8-column grid, 24px gutters, 32px side margins.
*   **Mobile (Up to 767px):** 4-column grid, 16px gutters, 16px side margins.
*   **Rhythm:** Spacing rhythm is based on a **4px baseline**, utilizing "Macro-spacing" (48px+) between major sections to prevent visual clutter. Product grids prioritize vertical breathing room to ensure each frame is perceived as a unique piece of craftsmanship.

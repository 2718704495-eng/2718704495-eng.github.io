# Personal Technology Portfolio — Design System

## Direction

- Audience: recruiters and technical interviewers.
- Style: calm, precise, engineering-led; dark ink-blue surfaces with cyan and green accents.
- Density: information-rich but readable. Content is never hidden behind interaction.
- Motion: short opacity/translate reveals only; the final state is always visible without JavaScript.

## Tokens

| Role | Dark | Light |
|---|---|---|
| Background | `#07111f` | `#f5f8fc` |
| Surface | `#0d1a2b` | `#ffffff` |
| Text | `#edf7ff` | `#0b1728` |
| Muted text | `#9db0c6` | `#4f6379` |
| Primary | `#48d7ff` | `#007ba3` |
| Secondary | `#5ee6a8` | `#087e55` |
| Border | `#21354d` | `#cfdae7` |

Use system sans-serif fonts, a 16px body baseline, 1.65 line height, 12–24px radii, and an 1180px content width.

## Components

- Navigation: sticky floating capsule with a visible focus ring and horizontally scrollable links on narrow screens.
- Buttons: high-contrast filled, outlined, and text styles; minimum 44px tap target.
- Cards: solid surface, 1px border, restrained cyan glow on hover/focus; never shift layout.
- Tags: compact code-like pills with wrapping enabled.
- Section heading: eyebrow label, concise heading, optional one-line introduction.

## Accessibility and responsive rules

- Keep text contrast at or above WCAG AA and never encode meaning using color alone.
- Provide a skip link, semantic landmarks, visible `:focus-visible`, and descriptive link labels.
- Content must remain complete with JavaScript disabled.
- At `prefers-reduced-motion: reduce`, disable smooth scroll and all non-essential transitions.
- At 720px and below, switch grids to one column and let long technology names wrap.
- Do not use autoplay media, particles, carousels, skill meters, emoji icons, or remote fonts.

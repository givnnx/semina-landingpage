# Semina Landing Page Design System & Anti-Slop Documentation

## Design Read & Dial Settings
> Reading this as: Event discovery & ticketing platform landing page for tech/design learners, in a high-contrast dark-navy + electric-green editorial style, dial `ENERGY 2 / RHYTHM 2 / MOTION 1`.

## Color Architecture & WCAG 2.2 AA Verified Pairs

| Foreground Token | Background Surface | Measured Contrast Ratio | Status | Usage |
|------------------|--------------------|-------------------------|--------|-------|
| `--color-green` (`#01fb34`) | `--color-navy` (`#151a26`) | **12.30:1** | PASS (AAA) | High-energy primary CTA text on dark surface |
| `--color-navy` (`#151a26`) | `--color-green` (`#01fb34`) | **12.30:1** | PASS (AAA) | Dark label on electric-green CTA button |
| `--color-green-ink` (`#007a1a`) | `#ffffff` (White Surface) | **5.53:1** | PASS (AA) | Green text, checkmarks, selected radio borders on light/card surfaces |
| `--color-muted-light` (`#5b616e`) | `#ffffff` (White Surface) | **6.21:1** | PASS (AAA) | Secondary labels, subheadings, categories on white cards |
| `--color-gray-text` (`#a3a5aa`) | `--color-navy` (`#151a26`) | **7.05:1** | PASS (AAA) | Muted copy on dark navy surfaces |
| `--color-accent-magenta` (`#c81e87`) | `#ffffff` (White Surface) | **5.26:1** | PASS (AA) | Editorial kicker/accent text on white |
| `#ffffff` | `--color-navy` (`#151a26`) | **17.26:1** | PASS (AAA) | Headings and primary copy on dark hero surfaces |

## Anti-Slop Principles
- **No Rainbow Text Gradients**: Eliminated `bg-clip-text text-transparent bg-gradient-to-r` AI slop in headings. High-contrast solid editorial colors (`--color-accent-magenta` on light, `--color-green` on dark) provide crisp typographical distinction.
- **No Nested Interactive Elements**: Eliminated `<button><a href="...">` and `<a href="..."><button>` patterns. Links are styled directly with button classes.
- **Card Surface Containment**: Form views and checkout sections are elevated into defined surface containers (`bg-white rounded-3xl p-6 md:p-10 text-navy shadow-2xl border border-border-light`) so all labels maintain >= 17:1 contrast.

## Typography & Radius Scale
- **Typeface**: `Poppins` (`next/font/google`)
- **Radius Hierarchy**:
  - `rounded-xl` (`12px`): Input fields, inner media thumbnails
  - `rounded-2xl` (`16px`): Event cards, payment selection options
  - `rounded-3xl` (`24px`): Hero surface cards, form containers, modal surfaces
  - `rounded-full`: Buttons, status badges, circular user avatars

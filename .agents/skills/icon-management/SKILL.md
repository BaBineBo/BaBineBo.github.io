---
name: icon-management
description: Choose, integrate, replace, and normalize icons in this project. Use when adding UI icons, social/brand icons, breadcrumb icons, button icons, or converting SVG assets into reusable React components. Prefer installed icon libraries first; if no direct match exists, ask whether to use a project SVG asset and then implement it consistently.
---

# Icon Management

Use this workflow:

1. Check installed icon libraries for a direct or close-enough match before creating anything custom.
2. If no suitable icon exists in installed libraries, ask whether to use a project SVG asset.
3. If the answer is yes, look in `public/assets/brand-icons/` first for brand/social icons.
4. When an asset is used repeatedly, turn it into a reusable React component under `src/lib/icons/`.
5. Make icons inherit color with `currentColor` unless a fixed brand color is explicitly required.
6. Keep icon usage consistent across similar UI elements.

## Library-First Rule

- Search installed icon packages before adding custom SVG code.
- Prefer direct imports from the existing library already used by the project when possible.
- If a package icon requires extra runtime deps, verify they are present before adopting it.

## Asset Fallback

- If no direct library match exists, ask before using an asset.
- For brand icons, check `public/assets/brand-icons/`.
- If the chosen asset is just a one-off static file, it may stay as an asset.
- If the icon will be reused or needs easy recoloring/styling, convert it into a React component in `src/lib/icons/`.

## Component Conventions

- Put reusable icon components in `src/lib/icons/`.
- Export a single icon component per file.
- Use concise component names like `LinkedInIcon` or `SubstackIcon`.
- Default to `aria-hidden="true"` inside icon components and let the button/link provide the accessible label.
- Prefer `fill="currentColor"` or `stroke="currentColor"` so the parent control owns the color.

## Decision Notes

- Use icon-only buttons for compact social/contact controls when labels are not needed visually.
- Use explicit color props only when a library ignores CSS color inheritance or a brand requirement demands it.
- Keep separators, breadcrumbs, and action icons visually distinct from clickable pills/links.

## Examples

- "Add a LinkedIn icon button to the homepage."
  First search installed icon libraries. If no LinkedIn icon exists, ask to use a project SVG asset, then convert it into `src/lib/icons/LinkedInIcon.tsx`.
- "Replace a generic email icon with an envelope icon."
  Search the installed icon package for a better semantic match like `Mail` before creating anything custom.
- "Make a brand icon match button hover color."
  Ensure the icon component uses `currentColor` instead of a hardcoded fill/stroke.

No bundled resources are required for this skill.

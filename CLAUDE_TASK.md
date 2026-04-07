# Mursen Website UI Fixes - Implementation Task

## Current Issues Found

1. **Color tokens mismatch**: The JSX uses tokens like `surface-`, `primary-`, `accent-`, `secondary-` but they are NOT defined in tailwind.config.js. Only `brand`, `teal`, `orange`, `stone` are defined. This causes colors to default incorrectly.

2. **Pricing cards contrast problem**: The "Most Popular" card (highlighted card) uses classes `pricing-card-highlighted` and `.text-white` but these card classes are NOT defined in index.css. This results in white text on white background (invisible).

3. **Cards look bland**: The `.card` class exists but is basic. Needs better borders, shadows, and hover effects.

4. **Inconsistent spacing/padding**: Container widths, section padding need standardization.

5. **Missing utility classes**: The code uses `badge`, `heading-2`, `lead` etc. which are not defined.

## Your Task

Implement a complete visual redesign with proper design system consistency:

### Step 1: Add missing color tokens to tailwind.config.js
Add these color extensions that match what the JSX expects:
- `surface`: extend stone (use stone tokens, add custom if needed)
- `primary`: use brand colors
- `accent`: use orange colors (or create a vibrant accent)
- `secondary`: use teal colors

### Step 2: Define missing CSS component classes in src/index.css
Add these component classes under @layer components:
- `.pricing-card-highlighted`: Gradient background (from-primary-800 to-surface-900), white text, accent glow border, prominent hover lift
- `.pricing-card-default`: Subtle white card with strong border, soft shadow, hover lift
- `.badge`: inline-flex, rounded-full, small text, semi-bold, with variants for different colors
- `.heading-2`: 2.75rem size, bold, tracking-tight (or reference the existing theme heading)
- `.lead`: lead paragraph style (text-lg md:text-xl, text-surface-500)

### Step 3: Enhance the base `.card` component
Improved card with:
- Better border color (stone-200)
- Softer shadow
- Smooth hover lift (translateY -4px) and shadow increase
- Subtle gradient border on hover

### Step 4: Standardize spacing
Ensure consistent container widths and section padding:
- `.container-app` is good (max-w-6xl, px-6)
- Sections already have py-20 md:py-28
- Ensure grid gaps consistent (gap-6 or gap-8)
- Add responsive padding where needed (px-4 on mobile)

### Step 5: Button contrast polish
Ensure buttons have proper contrast:
- `btn-primary`: bg-primary-600, text-white
- `btn-secondary`: bg-secondary-600, text-white
- `btn-outline`: border-stone-300, text-stone-700 with hover border-primary-500
Make hover effects strong enough.

### Step 6: Mobile spacing improvements
Add responsive padding to cards and sections where missing. Use `md:` prefixes.

### Step 7: Add glow effects for highlighted card
For `pricing-card-highlighted`, add an accent-colored glow border effect using box-shadow with accent color (orange/teal) with low opacity.

## Implementation Notes

- Maintain existing design tokens and Tailwind setup.
- Do not change the JSX structure; only add CSS classes and Tailwind config.
- The highlighted pricing card should have a dark gradient background with white text and an accent border/glow.
- Ensure contrast ratios meet WCAG AA (4.5:1 minimum).
- Add hover:scale-105 or hover:-translate-y-1 for tactile feel.

When finished:
1. Build the project: pnpm run build
2. Verify build completes without errors
3. Deploy to Vercel using existing project configuration (vercel.json and .vercel/project.json exist)
4. Report back summary of changes, build output, and Vercel URL

Start by reading current src/index.css and tailwind.config.js.
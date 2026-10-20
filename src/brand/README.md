# CrewMind brand assets

The logo artwork is extracted from `logo.pdf`; it is not AI-redrawn.

## Website defaults

- Use `crewmind-lockup-black.svg` on light backgrounds.
- Use `crewmind-lockup-white.svg` on dark backgrounds.
- Use the `mark` SVGs where the wordmark would be too small: navigation, compact controls, and app chrome.
- Prefer SVG on the web. PNG files are for email, CMS uploads, and platforms that do not accept SVG.
- Minimum display size: 24 px for the mark; 120 px wide for the horizontal lockup.
- Keep clear space equal to the width of the mark's stroke around every logo.

## Tokens

```css
:root {
  --crewmind-ink: #14181F;
  --crewmind-white: #FFFFFF;
  --crewmind-teal: #0E5A66;
  --crewmind-surface: #F7F6F2;
}
```

## Asset map

| Use | File |
| --- | --- |
| Primary logo, light surface | `crewmind-lockup-black.svg` |
| Primary logo, dark surface | `crewmind-lockup-white.svg` |
| Logo-only, any scale | `crewmind-mark-black.svg` / `crewmind-mark-white.svg` |
| Browser favicon | `favicon.ico` |
| Apple touch icon | `crewmind-mark-black-180.png` |
| PWA icon | `crewmind-app-icon-black-512.png` |
| Social sharing | `crewmind-og-1200x630.png` |

Do not stretch, rotate, add shadows, or recolor the logo outside the supplied black and white variants.

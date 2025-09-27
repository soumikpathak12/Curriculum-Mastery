# Landing Page Mental Model

This document explains the conceptual architecture of the redesigned landing page and the rationale behind it.

## Goals
- Present a clear, professional value proposition for the "IB & IGCSE Music Educators Course".
- Align strictly to provided content in `docs/Website Content Working Document.txt` and `public/website content/Website Content WIP.txt`.
- Leverage the brand palette defined in `src/styles/brand-colors.css`.
- Keep components modular and reusable (Header, FAQ, Testimonials, ContactUs).

## Information Architecture
1. Hero
   - Tag: IB & IGCSE Music Educators Course
   - Headline: Master the Skills to Teach IB & IGCSE Music with Confidence
   - Subhead: Clarity. Purpose. Confidence.
   - Right-side course summary card with CTA (Enroll Now – ₹49,900), Duration, Certificate, Format
2. Exclusive Features
3. What Will I Learn
4. Modules (8)
5. Testimonials (component)
6. Requirements & Resources Provided
7. FAQ (component)
8. About Pratik (bio, credentials, video placeholder)
9. Contact Us (component)
10. Disclaimer
11. Footer

## Design Principles
- Use brand colors: `--federal-blue`, `--zaffre`, neutral tones from `brand-colors.css`.
- Employ gradients and soft shadows to create depth while maintaining readability.
- Ensure responsive layout with clear visual hierarchy at all breakpoints.
- Prefer composition: centralize logic inside dedicated components (e.g., FAQ, ContactUs, Testimonials).

## Componentization Strategy
- Page (`src/app/page.tsx`): Orchestrates sections using dedicated components.
- `Header.tsx`: Sticky navigation with anchors.
- `FAQ.tsx`: Self-contained accordion state.
- `Testimonials.tsx`: Three-card testimonial grid.
- `ContactUs.tsx`: Mailto-based contact form + info.

## Future Extensions
- Replace the video placeholder with an actual embed or local file.
- Add analytics for CTA clicks and newsletter conversions.
- Optional: add a course schedule section once dates are confirmed.

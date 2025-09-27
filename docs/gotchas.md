# Gotchas

- FAQ State: Do not reintroduce inline FAQ logic in `page.tsx`. Use `src/components/FAQ.tsx` which encapsulates its own state.
- Mailto Behavior: `ContactUs.tsx` uses a `mailto:` link. This opens the user's default mail client—no server-side email delivery. If server delivery is needed later, add an API route and integrate an email service (e.g., Resend, SendGrid).
- Newsletter Endpoint: The newsletter section depends on `/api/newsletter`. Ensure this route exists and handles POST requests robustly.
- Performance: Animated hero backgrounds can be GPU/CPU intensive on low-end devices. Consider reducing animation density if needed.
- Assets: When changing any asset filename in `public/assets/`, update corresponding `Image` `src` in components.
- Legal/Disclaimer: Keep the disclaimer content verbatim to avoid misrepresentation of association with IB/IGCSE organizations.

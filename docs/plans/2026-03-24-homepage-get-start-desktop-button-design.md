# Homepage GET START Desktop Button Design

**Goal:** Change only the homepage `GET START` button on desktop so it matches the wider single-line appearance from the provided reference, while keeping mobile and tablet behavior unchanged.

## Scope

- Only the homepage button in `app/routes/_index.tsx`
- Only desktop layout and styling
- Keep the existing `AnimatedButton` hover treatment

## Approach

1. Extend `AnimatedButton` with an optional `className` prop so the homepage can opt into a local variant.
2. Add a homepage-only class to the `GET START` button instance.
3. Add a desktop media-query override that:
   - forces single-line text
   - centers the label vertically and horizontally
   - widens the button and reduces the tall stacked appearance

## Non-Goals

- No global change to `.btn-17`
- No changes to mobile or tablet button appearance
- No new button component

# Improvement Roadmap

This roadmap keeps the project moving in small, reviewable steps over 10-15 days. Each step should be a focused commit or short group of commits that improves the system without making the history look artificial.

## Day 1 - Repository polish

- Add root ignore rules and environment templates.
- Align dependency versions that affect local setup.
- Clarify setup instructions and the project direction.
- Remove leftover starter/demo artifacts where they distract from the issue tracker.

## Day 2 - Backend request validation

- Validate issue payloads before they reach the service layer.
- Return consistent 400 responses for invalid ids, status values, and issue types.
- Add small request examples to the README.

## Day 3 - Prisma and data model hardening

- Make issue type a first-class enum in the schema.
- Add useful indexes for status, assignee, and creation time.
- Improve seed data so the dashboard has realistic operational examples.

## Day 4 - Docker developer experience

- Add backend and frontend services to Compose if the local workflow benefits from it.
- Make health checks and service dependencies easier to understand.
- Document common startup and troubleshooting commands.

## Day 5 - Frontend data integration

- Replace mock-only issue fetching with API-backed services and graceful fallbacks.
- Add loading and empty states for issue list/detail views.
- Keep the UI focused on operational scanning rather than marketing copy.

## Day 6 - Issue workflow polish

- Add clear status transitions and update semantics.
- Show issue metadata consistently across dashboard, list, and detail pages.
- Introduce lightweight activity timestamps or labels.

## Day 7 - Kafka event visibility

- Publish issue lifecycle events from create/update/delete flows.
- Add a small event test script or local verification path.
- Document how to inspect events in Kafka UI.

## Day 8 - Slack integration cleanup

- Separate Slack mapping, modal creation, and API calls cleanly.
- Add safer handling for missing Slack tokens in local development.
- Include sample payloads or notes for testing interactions.

## Day 9 - Testing baseline

- Add focused backend tests for validation, service behavior, or repository boundaries.
- Add smoke checks for the health endpoint and one issue endpoint.
- Make test commands easy to run from the README.

## Day 10 - Portfolio finish

- Add screenshots or a short architecture diagram.
- Tighten README wording for a hiring-manager skim.
- Tag the first polished milestone release.

## Optional stretch work

- Add WebSocket/SSE issue updates.
- Add issue search and filtering.
- Add role-aware assignment or labels.
- Add a small CI workflow for lint/build checks.

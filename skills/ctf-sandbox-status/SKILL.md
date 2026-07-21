---
name: ctf-sandbox-status
description: Checks CTF sandbox availability for a Jira ticket ID by probing Vibe and brand endpoints (Bunte, Focus, Chip, Fit for fun). Use when the user asks for sandbox status, availability, or URLs for a ticket like TT-12345, FOL-234, or CTF-5634.
---

# CTF Sandbox Status

Check whether a CTF sandbox is up for a Jira ticket ID.

## When to use

- User asks for sandbox status/availability for a ticket ID
- User asks for sandbox URLs for a ticket
- User mentions "sandbox", "vibe", or brand sites in context of a Jira ticket

## Quick start

Run the check script:

```bash
node ./scripts/check-sandbox.mjs TT-12345
```

Replace `TT-12345` with the ticket ID from the user's request.

## Report format

Present the script output to the user. When **overall status is available** (green):

1. Summarize which endpoints are healthy vs unhealthy
2. Print the **Vibe CMS URL** and all **brand URLs**

When **unavailable** (red):

- Report that no endpoints responded
- Suggest verifying the ticket ID and sandbox provisioning

## Status rules

| Per-endpoint | Meaning |
|--------------|---------|
| healthy | HTTP 2xx on health-check URL |
| unhealthy | Non-2xx or network error |

| Overall | Meaning |
|---------|---------|
| available | At least one endpoint is healthy |
| unavailable | All endpoints unhealthy |

## Endpoints checked

Ticket slug = lowercase ticket ID (e.g. `TT-12345` → `tt-12345`).

| Target | Health-check URL | User URL |
|--------|------------------|----------|
| Vibe | `https://{slug}.vibe.bf-ctf-sandbox.aws.bfops.io/` | `https://{slug}.vibe.bf-ctf-sandbox.aws.bfops.io/articles` |
| Bunte | `…/ctf/bunte/favicon/favicon.ico` | `https://{slug}.bunte.bf-ctf-sandbox.aws.bfops.io/` |
| Focus | `…/ctf/focus/favicon/favicon.ico` | `https://{slug}.focus.bf-ctf-sandbox.aws.bfops.io/` |
| Chip | `…/ctf/chip/favicon/favicon.ico` | `https://{slug}.chip.bf-ctf-sandbox.aws.bfops.io/` |
| Fit for fun | `…/ctf/fitforfun/favicon/favicon.ico` | `https://{slug}.fitforfun.bf-ctf-sandbox.aws.bfops.io/` |

Valid ticket IDs match `/^[A-Za-z]+-\d+$/` (e.g. `TT-12345`, `FOL-234`).

## SSO bypass

Health checks do not need special headers. When sharing URLs for manual browser testing, mention that the user may need to send `ctfTestsBypass: super-secret-header` on requests to bypass SSO.

## Workflow

```
Task Progress:
- [ ] Extract ticket ID from user message
- [ ] Run check-sandbox.mjs with that ticket ID
- [ ] Report per-endpoint status
- [ ] If available, print Vibe + brand URLs
```

If the user gives multiple ticket IDs, run the script once per ticket and report each separately.

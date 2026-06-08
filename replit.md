# TempMail — Disposable Email Service

A modern, fully functional temporary email website that generates disposable email addresses using the mail.gw public API. Users can receive real activation emails, copy their address, refresh the inbox, generate a new address, and delete their account.

## Run & Operate

- `pnpm --filter @workspace/tempmail run dev` — run the frontend (port assigned by workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000) — not used by this app
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, shadcn/ui, framer-motion
- API: mail.gw public API (called directly from browser, no backend needed)
- State: localStorage for account persistence, TanStack Query for polling
- Routing: wouter

## Where things live

- `artifacts/tempmail/src/pages/Home.tsx` — main page with inbox + message viewer
- `artifacts/tempmail/src/components/EmailDisplay.tsx` — email address + action buttons
- `artifacts/tempmail/src/components/InboxList.tsx` — inbox list
- `artifacts/tempmail/src/components/MessageViewer.tsx` — full message viewer
- `artifacts/tempmail/src/components/AdSlot.tsx` — reusable Google AdSense slot
- `artifacts/tempmail/src/hooks/useMailbox.ts` — mail.gw API logic + state
- `artifacts/tempmail/src/index.css` — dark theme with electric teal accent

## Architecture decisions

- Frontend-only: calls mail.gw API directly from browser (no proxy needed, CORS supported)
- Account credentials stored in localStorage for session persistence
- Auto-refresh every 15 seconds using TanStack Query `refetchInterval`
- Dark-first theme with electric teal (#00d4b8-ish) as primary accent
- Ad slots use `ins.adsbygoogle` structure ready for Google AdSense integration

## Product

Users land on the page and instantly get a disposable email address. They can copy it, use it to sign up somewhere, and watch activation emails arrive in real time. The inbox auto-refreshes every 15 seconds with a countdown timer. Users can generate a new address or delete their current one at any time. Three ad banner slots are placed for Google AdSense monetization.

## User preferences

- Arabic-speaking user, building for AdSense revenue
- mail.gw API for email generation
- Buttons: copy, refresh, change email, delete email
- Ad spaces for Google AdSense

## Gotchas

- mail.gw API base URL: https://api.mail.gw — supports CORS
- Account password is auto-generated and stored in localStorage (user never sees it)
- LocalStorage key: `tempmail_account` (JSON with email, password, accountId, token)
- Google Fonts @import must be the VERY FIRST line in index.css

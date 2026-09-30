# Convo: Supabase Auth + Realtime messaging

Angular component and service logic uses TypeScript. Tailwind CSS utilities and
PrimeNG 20.4.0 power the responsive login and messenger UI.
Edit layout and appearance in `src/app/login.html` and `src/app/chat.html`;
`src/styles.css` contains Tailwind imports and shared base styles. No SCSS is used.
Supabase manages accounts, profiles, message storage, row-level security, and live message updates.

## Development

    cd SignalR.client
    npm ci
    npm start

Open http://localhost:4200.
The client connects directly to Supabase Auth, Postgres, and Realtime.

## Deploy the Angular client on Vercel

Import the repository into Vercel and use the repository root as the project root.
The root `vercel.json` installs client dependencies, builds Angular, publishes
`SignalR.server/wwwroot` as static output, and routes app paths such as `/chat` to Angular.
The client no longer needs an ASP.NET server for chat.

The Supabase project URL and publishable key are in `src/app/supabase.config.ts`.
The `sb_publishable_...` key is intended for browser apps; never put a `service_role`
or secret key in the client. Protect data with the RLS policies.

## Supabase configuration

Project: https://supabase.com/dashboard/project/uztzqyvtaonvnelxowlg

Client: src/app/supabase.config.ts.
Server: ../SignalR.server/appsettings.json, under Supabase.
The browser client only needs the URL and publishable key in `src/app/supabase.config.ts`.
The server settings apply only if you separately host the legacy ASP.NET server.
Never put a service-role or secret key in the browser.

In Authentication > URL Configuration, set the deployed app origin as Site URL.
For local work use http://localhost:4200, and allow these redirects:

- http://localhost:4200/chat
- http://localhost:5180/chat
- https://localhost:7145/chat if using the HTTPS launch profile
- Your deployed /chat URL

Keep email confirmation enabled. Configure production SMTP for confirmation emails.

## Try private messaging

Create two accounts with email addresses you control and confirm each email.
Sign in in separate browsers or normal + Incognito windows.
Both users must open /chat once to create their display profiles.
Refresh People, select the other account, and send a message.
Reload to confirm history persists. A check mark means saved, not read.
Enter sends; Shift + Enter creates a new line.
On a phone, select a person to open the conversation; the back arrow returns to People.

## Message flow and authorization

1. The browser signs in with Supabase Auth and subscribes to inserts in `public.messages`.
2. Supabase Realtime applies the table's row-level security policy to delivered events.
3. The browser inserts messages using the signed-in user's session; RLS checks the sender ID.
4. On reconnect, the client reloads the latest 100 messages from Postgres.

All signed-in users can discover public display names and IDs. Emails are not in the directory.
Users can read only messages where they are sender or recipient.
The schema is recorded in ../supabase/schema.sql and already installed; do not rerun it.

This version has no read receipts, attachments, push notifications, older-history pagination,
or offline outgoing queue.
Production hosting should use HTTPS.

## Legacy ASP.NET server checks

    npm test -- --watch=false --browsers=ChromeHeadless
    npm run build
    dotnet test ../SignalR.tests/SignalR.tests.csproj
    dotnet build ../SignalR.server/SignalR.csproj

These checks apply only to the optional legacy ASP.NET server. Its tests run SignalR connections
against a test host with a simulated Supabase API.
They check anonymous/invalid-token denial, sender/recipient routing, multiple sender tabs,
input validation, and no delivery when persistence fails.

For live verification, supply three dedicated confirmed test accounts using
CONVO_TEST_EMAIL_A/B/C and CONVO_TEST_PASSWORD_A/B/C environment variables.
Start the backend, then run:

    node scripts/verify-signalr.cjs

Optionally set CONVO_TEST_HUB_URL=http://localhost:4200/hub to test the Angular proxy.
The live check covers the legacy ASP.NET SignalR server, not the Vercel client.

Builds may report the existing 500 kB initial-bundle warning and the 4 kB component-style warning.
Both remain below the configured build-error limits.

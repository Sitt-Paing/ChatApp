# Convo: Supabase Auth + SignalR messaging

Angular component and service logic uses TypeScript. Tailwind CSS utilities and
PrimeNG 20.4.0 power the responsive login and messenger UI.
Edit layout and appearance in `src/app/login.html` and `src/app/chat.html`;
`src/styles.css` contains Tailwind imports and shared base styles. No SCSS is used.
Supabase manages accounts, profiles, message storage, and database row-level security.
ASP.NET SignalR delivers live messages to the sender and recipient.

## Development: run BOTH terminals

Terminal 1, repository root:

    dotnet run --project SignalR.server/SignalR.csproj --launch-profile http

Terminal 2:

    cd SignalR.client
    npm ci
    npm start

Open http://localhost:4200.
The Angular development proxy forwards /hub and its WebSocket traffic to http://localhost:5180.
Keep the backend running for live messaging.

## Serve the built app directly from ASP.NET

    cd SignalR.client
    npm ci
    npm run build
    cd ..
    dotnet run --project SignalR.server/SignalR.csproj --launch-profile http

Open http://localhost:5180. Rebuild the frontend after source changes.
The server supports direct navigation to /login and /chat.

## Supabase configuration

Project: https://supabase.com/dashboard/project/uztzqyvtaonvnelxowlg

Client: src/app/supabase.config.ts.
Server: ../SignalR.server/appsettings.json, under Supabase.
Both contain only the project's URL and publishable key.
Deployment can override the server with Supabase__Url and Supabase__PublishableKey.
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

1. The browser gets its session token from Supabase Auth and passes it to /hub.
2. The server verifies the token with Supabase Auth's /auth/v1/user endpoint.
   It never trusts an unverified JWT or a client-supplied sender ID.
3. SendMessage takes only recipient ID and text. Sender comes from the authenticated principal.
4. The server inserts the message using that user's bearer token. Database RLS still applies.
5. Only after a successful save does SignalR send messageReceived to both users' active connections.
6. Reconnection reloads the latest 100 messages to recover missed events.

Hub access requires authentication; connections close when their verified token expires.
The SDK reconnects with the current session token. After retries run out, use Reconnect.
Supabase Realtime subscriptions are no longer used by the client.
The existing supabase_realtime publication may remain; it is not required for this flow.

All signed-in users can discover public display names and IDs. Emails are not in the directory.
Users can read only messages where they are sender or recipient.
The schema is recorded in ../supabase/schema.sql and already installed; do not rerun it.

This version has no read receipts, attachments, push notifications, older-history pagination,
or offline outgoing queue. Multiple server instances require a SignalR backplane or Azure SignalR.
The sample WeatherForecast API remains public; it is not part of messaging.
Production hosting should use HTTPS.

## Validation

    npm test -- --watch=false --browsers=ChromeHeadless
    npm run build
    dotnet test ../SignalR.tests/SignalR.tests.csproj
    dotnet build ../SignalR.server/SignalR.csproj

Backend tests run real SignalR connections against a test host with a simulated Supabase API.
They check anonymous/invalid-token denial, sender/recipient routing, multiple sender tabs,
input validation, and no delivery when persistence fails.

For live verification, supply three dedicated confirmed test accounts using
CONVO_TEST_EMAIL_A/B/C and CONVO_TEST_PASSWORD_A/B/C environment variables.
Start the backend, then run:

    node scripts/verify-signalr.cjs

Optionally set CONVO_TEST_HUB_URL=http://localhost:4200/hub to test the Angular proxy.
The live check sends a test message between A and B, verifies C cannot receive/read it,
and signs out the dedicated accounts afterward. Use disposable accounts, not normal sessions.

Builds may report the existing 500 kB initial-bundle warning and the 4 kB component-style warning.
Both remain below the configured build-error limits.

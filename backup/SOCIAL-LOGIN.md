# Social login setup (Google now, Apple later)

The web app renders whatever sign-in methods Kratos offers — so a social button
appears automatically once its provider is configured. Each provider needs an
OAuth app registered on the provider's platform, with this **redirect URI**:

```
http://localhost:8000/.ory/kratos/self-service/methods/oidc/callback/<provider>
```

Credentials are supplied to the local stack via Terraform vars (never committed):

```bash
export TF_VAR_google_oidc_client_id=...      # from Google
export TF_VAR_google_oidc_client_secret=...
make dev                                      # re-applies; Google provider turns on
```

When no creds are set, the Google provider is omitted and the app runs
password-only.

---

## Google (do now)

1. https://console.cloud.google.com — create or select a project.
2. **APIs & Services → OAuth consent screen** → User type **External** → fill app
   name + support email. Under **Test users**, add your own Google account. This
   keeps the app in "testing" (no Google verification needed for dev).
3. **APIs & Services → Credentials → Create credentials → OAuth client ID** →
   Application type **Web application**.
4. Under **Authorized redirect URIs**, add exactly:
   ```
   http://localhost:8000/.ory/kratos/self-service/methods/oidc/callback/google
   ```
5. **Create** → copy the **Client ID** and **Client secret**.
6. Provide them locally:
   ```bash
   export TF_VAR_google_oidc_client_id=<client id>
   export TF_VAR_google_oidc_client_secret=<client secret>
   ```
7. `make dev` (re-apply). The "Sign in with Google" button appears on the login
   and register pages.
8. Test: open `http://localhost:8000/login` → **Sign in with Google** → consent →
   redirected back to `/`, signed in with your Google email.

> Note: Google rejects custom-host `http://` redirect URIs — that's why the POC
> runs on `http://localhost:8000`, not `http://api.lms.local:8000`.

---

## Apple (later — not wired yet)

Apple requires a paid Apple Developer account. The provider block is scaffolded
(commented) in `infra/terraform/ory.tf`; uncomment and supply the values below.

1. https://developer.apple.com → **Certificates, IDs & Profiles**.
2. **Identifiers → App ID**: create (or reuse) an App ID with the **Sign in with
   Apple** capability enabled.
3. **Identifiers → Services ID**: create one — this string is the OAuth
   `client_id`. Enable **Sign in with Apple**, then configure:
   - **Domains**: `localhost` (dev) — Apple allows localhost for testing.
   - **Return URLs**:
     ```
     http://localhost:8000/.ory/kratos/self-service/methods/oidc/callback/apple
     ```
4. **Keys**: create a **Sign in with Apple** key, download the `.p8` private key,
   and note the **Key ID**. Note your **Team ID** (top-right of the portal).
5. Apple's OAuth `client_secret` is a short-lived **ES256 JWT** signed with the
   `.p8`. Kratos generates it for you from the key material — provide
   `apple_private_key` (.p8 contents), `apple_team_id`, `apple_key_id`, and the
   Services ID as `client_id`.
6. Uncomment the `apple` provider in `ory.tf`, add the matching Terraform vars,
   set them via `TF_VAR_*`, and `make dev`.

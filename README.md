# React Router + shadcn/ui

This is a template for a new React Router project with React, TypeScript, and shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

## Auth & data sources

Auth lives in `app/store/use-profile.tsx`. The backend is chosen at runtime from
the `?debug=` query param, so no env rebuild is needed to switch:

| URL                   | Source   | Notes                                            |
| --------------------- | -------- | ------------------------------------------------ |
| _(none)_ / `?debug=kratos` | `kratos` | Real Ory Kratos (needs the backend running)      |
| `?debug=mock`         | `mock`   | In-memory demo data, no backend required         |
| `?debug=<other>`      | —        | Unregistered → throws "Data source not found"    |

`?debug=` is **dev-only**: in a production build the param is ignored (always
`kratos`) and the mock source is dead-code eliminated from the bundle. Add a
backend by registering it in the `SOURCES` map in `use-profile.tsx`.

### Run with no backend (mock)

Open `/login?debug=mock` and sign in (password ignored). Demo accounts live in
`app/store/mock-auth.ts`:

| Email                 | Roles                          |
| --------------------- | ------------------------------ |
| `teacher@school.edu`  | teacher                        |
| `student@school.edu`  | student                        |
| `staff@school.edu`    | schoolstaff                    |
| `admin@school.edu`    | teacher, student, schoolstaff  |

Any other email logs in as the multi-role admin. Roles drive the sidebar menu
and landing page.

### Run against Kratos

Default. The dev server proxies `/.ory/kratos` → `KRATOS_URL`
(`http://localhost:4433` by default; override per `vite.config.ts`).

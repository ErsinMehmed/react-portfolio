# Ersin Hyusein — Portfolio

Personal portfolio site: About, Resume, Projects and Certifications, with
full English/Bulgarian localisation.

## Tech stack

- **React 18** + **React Router 6** (lazy-loaded routes)
- **Vite 5** build tooling, **Vitest** for tests
- **Tailwind CSS** + **flowbite-react**
- **Framer Motion** for animation
- Custom lightweight i18n via React Context (`src/i18n`)

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `build/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run the test suite once (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint `src` (zero warnings allowed) |

## Testing

Tests live in [`src/tests`](src/tests) and run on Vitest + Testing Library
in a jsdom environment. `src/setupTests.js` registers the jest-dom matchers.

## Deployment

Netlify builds from source (`netlify.toml`): `npm run build` publishes the
`build/` folder, with a SPA fallback so client-side routes resolve on refresh.
CI (`.github/workflows/ci.yml`) runs lint, tests, a production build and a
Lighthouse budget on every push and pull request.

# FoodWagen

A small Next.js landing demo for food discovery and ordering using mock data. The app demonstrates a responsive hero with search, featured meals, and a footer with newsletter subscription.

Tech stack
- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS
- Vitest + Testing Library for unit/integration tests


## Prerequisites
- Node.js (recommended >= 18)
- npm (bundled with Node)


## Setup (PowerShell)
Open a PowerShell terminal at the project root (where `package.json` is) and run:

```powershell
# install dependencies
npm install

# start development server
npm run dev

# build for production
npm run build

# run production server (after build)
npm run start

# run tests (Vitest)
npm run test

# run linter (if configured)
npm run lint
```

Notes:
- If you update `package.json`, re-run `npm install`.
- If VS Code shows TypeScript errors in tests (missing `describe`/`test`/`expect`), restart the TypeScript server (Command Palette → "TypeScript: Restart TS Server"). See "Editor troubleshooting" below.


## Project structure
```
app/                # Next.js app routes
components/         # React components (Hero, Footer, FoodCard, etc.)
lib/                # mock data and helpers
public/images       # static images used by the UI
tests/              # Vitest tests
vitest.config.ts
tsconfig.json
package.json
README.md
```


## Tests
The project uses Vitest + Testing Library. Tests are under `tests/` and the test runner is configured in `vitest.config.ts`.

Run all tests:

```powershell
npm run test
```

Run a single test file:

```powershell
npx vitest run tests/Hero.test.tsx
```

If tests fail to resolve imports like `@/lib/mockData`, ensure dependencies are installed and the alias is configured in `vitest.config.ts`. Also restart the editor TS server.


## Styling & assets
- Tailwind config: `tailwind.config.js`
- Static images: `public/images` (keep file names consistent with `lib/mockData.ts`)


## Editor troubleshooting
- Make sure `node_modules` contains `vitest` and `@testing-library/jest-dom` (run `npm install`).
- If your editor (VS Code) still shows red squiggles in tests, restart the TS server: Ctrl+Shift+P → "TypeScript: Restart TS Server".
- You can add types to `tsconfig.json` to make the test globals available to the editor:

```json
"compilerOptions": {
  "types": ["vitest", "@testing-library/jest-dom"]
}
```


## Contributing
- Open issues or PRs for fixes and improvements.
- When adding features, include tests for rendering and user interactions.


## License
MIT
Abrhaley Gebrelassie

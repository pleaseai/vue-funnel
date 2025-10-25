# Development Setup Guide

This guide will help you set up the vue-funnel monorepo for development.

## Prerequisites

- **Node.js**: >= 18.0.0
- **pnpm**: >= 9.0.0 (this project uses pnpm workspaces)

## Installation

### 1. Install pnpm

If you don't have pnpm installed:

```bash
npm install -g pnpm
# or
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### 2. Clone the Repository

```bash
git clone https://github.com/amondnet/vue-funnel.git
cd vue-funnel
```

### 3. Install Dependencies

```bash
pnpm install
```

This will install dependencies for all packages in the workspace.

## Project Structure

```
vue-funnel/
├── packages/
│   └── vue-funnel/              # Main library package
│       ├── src/
│       │   ├── composables/
│       │   │   └── useFunnel.ts # Core composable
│       │   └── index.ts         # Package entry point
│       ├── test/
│       │   └── useFunnel.test.ts
│       ├── package.json
│       ├── tsconfig.json
│       ├── vitest.config.ts
│       └── build.config.ts      # unbuild configuration
├── docs/                        # Documentation (Nuxt + Content)
│   ├── content/
│   ├── nuxt.config.ts
│   └── package.json
├── turbo.json                   # Turborepo configuration
├── pnpm-workspace.yaml          # pnpm workspace config
├── package.json                 # Root package.json
└── eslint.config.js            # ESLint config (@antfu/eslint-config)
```

## Development Commands

### Root Level Commands

Run these from the project root:

```bash
# Build all packages
pnpm build

# Run all tests
pnpm test

# Lint all packages
pnpm lint

# Format all code
pnpm format

# Type check all packages
pnpm typecheck

# Clean all build artifacts and node_modules
pnpm clean
```

### Package-Specific Commands

#### Library (`packages/vue-funnel`)

```bash
# Build the library
pnpm --filter vue-funnel build

# Run tests
pnpm --filter vue-funnel test

# Run tests in watch mode
pnpm --filter vue-funnel test --watch

# Run tests with UI
pnpm --filter vue-funnel test:ui

# Generate coverage report
pnpm --filter vue-funnel test:coverage

# Type check
pnpm --filter vue-funnel typecheck
```

#### Documentation (`docs`)

```bash
# Start dev server
pnpm --filter docs dev

# Build documentation
pnpm --filter docs build

# Preview built docs
pnpm --filter docs preview
```

## Development Workflow

### 1. Making Changes to the Library

1. Navigate to `packages/vue-funnel/src/`
2. Make your changes
3. Run tests: `pnpm --filter vue-funnel test`
4. Build: `pnpm --filter vue-funnel build`

### 2. Writing Tests

- Test files are in `packages/vue-funnel/test/`
- We use Vitest with Vue Test Utils
- Run tests in watch mode: `pnpm --filter vue-funnel test --watch`

### 3. Running the Docs Locally

```bash
pnpm --filter docs dev
```

Then open http://localhost:3000

### 4. Code Quality

Before committing:

```bash
# Format code
pnpm format

# Lint and fix issues
pnpm lint

# Run all tests
pnpm test

# Type check
pnpm typecheck
```

Or simply commit - husky will run lint-staged automatically!

## Turborepo

This project uses [Turborepo](https://turbo.build) for efficient task running:

- **Caching**: Build outputs are cached to speed up subsequent builds
- **Parallelization**: Tasks run in parallel when possible
- **Task Dependencies**: Ensures correct build order

View the task graph:

```bash
pnpm build --graph
```

## Technology Stack

### Library
- **Vue 3**: Framework
- **TypeScript**: Type safety
- **Vitest**: Testing framework
- **unbuild**: Build tool
- **@vue/test-utils**: Vue component testing

### Documentation
- **Nuxt 3**: Framework
- **Nuxt Content**: Content management
- **TailwindCSS**: Styling

### Developer Tools
- **pnpm**: Package manager
- **Turborepo**: Monorepo build system
- **@antfu/eslint-config**: Code linting
- **husky**: Git hooks
- **lint-staged**: Pre-commit checks

## Common Tasks

### Add a New Package

1. Create directory in `packages/`
2. Add `package.json`
3. Update `pnpm-workspace.yaml` if needed
4. Update `turbo.json` with build tasks
5. Run `pnpm install`

### Update Dependencies

```bash
# Update all dependencies
pnpm up -r

# Update specific package
pnpm --filter vue-funnel up vitest

# Update to latest
pnpm up -r --latest
```

### Publish Packages

```bash
# Build all packages
pnpm build

# Publish to npm (from package directory)
cd packages/vue-funnel
pnpm publish
```

## Troubleshooting

### Issue: Build fails

```bash
# Clean and rebuild
pnpm clean
pnpm install
pnpm build
```

### Issue: Tests fail

```bash
# Clear Vitest cache
rm -rf packages/vue-funnel/node_modules/.vitest
pnpm --filter vue-funnel test
```

### Issue: Type errors

```bash
# Rebuild types
pnpm --filter vue-funnel build
pnpm typecheck
```

### Issue: ESLint errors

```bash
# Auto-fix issues
pnpm lint --fix
```

## VS Code Setup

Recommended extensions (see `.vscode/extensions.json`):
- ESLint
- Prettier
- Volar (Vue Language Features)
- Iconify IntelliSense
- UnoCSS

The workspace settings are already configured in `.vscode/settings.json`.

## Next Steps

- Read [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
- Check out the [README.md](./README.md) for library documentation
- Visit the docs at http://localhost:3000 after running `pnpm --filter docs dev`

## Questions?

Open an issue on [GitHub](https://github.com/amondnet/vue-funnel/issues)!

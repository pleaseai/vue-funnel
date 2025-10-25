# Quick Start Guide

Get up and running with vue-funnel development in 5 minutes!

## Prerequisites

```bash
# Check Node.js version (need >= 18.0.0)
node --version

# Install pnpm globally
npm install -g pnpm
```

## Setup in 4 Steps

### 1. Install Dependencies

```bash
pnpm install
```

This installs dependencies for all packages in the monorepo.

### 2. Build the Library

```bash
pnpm build
```

This builds the `vue-funnel` library package.

### 3. Run Tests

```bash
pnpm test
```

All tests should pass! ✅

### 4. Start Documentation

```bash
pnpm --filter docs dev
```

Open http://localhost:3000 to view the docs.

## Common Commands

```bash
# Development
pnpm --filter vue-funnel dev       # Library dev mode
pnpm --filter docs dev             # Docs dev server

# Testing
pnpm test                          # Run all tests
pnpm --filter vue-funnel test      # Library tests only

# Building
pnpm build                         # Build everything

# Linting
pnpm lint                          # Lint all code
pnpm format                        # Format all code

# Cleaning
pnpm clean                         # Clean all build artifacts
```

## Project Structure

```
vue-funnel/
├── packages/vue-funnel/    # Main library
│   ├── src/               # Source code
│   └── test/              # Tests
└── docs/                  # Documentation site
```

## Making Changes

### To the Library

1. Edit files in `packages/vue-funnel/src/`
2. Run tests: `pnpm --filter vue-funnel test`
3. Build: `pnpm --filter vue-funnel build`

### To the Docs

1. Edit files in `docs/content/`
2. The dev server auto-reloads changes

## Next Steps

- 📖 Read [SETUP.md](./SETUP.md) for detailed setup
- 🤝 Read [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
- 📁 Read [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for architecture
- 🚀 Check out the [README.md](./README.md) for library usage

## Troubleshooting

**Build fails?**
```bash
pnpm clean && pnpm install && pnpm build
```

**Tests fail?**
```bash
rm -rf packages/vue-funnel/node_modules/.vitest
pnpm --filter vue-funnel test
```

**Need help?**
Open an issue on [GitHub](https://github.com/amondnet/vue-funnel/issues)

---

Happy coding! 🎉

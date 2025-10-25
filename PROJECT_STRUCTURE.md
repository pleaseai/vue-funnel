# Project Structure

Complete directory structure of the vue-funnel monorepo.

```
vue-funnel/
├── .github/                    # GitHub workflows (to be added)
├── .husky/                     # Git hooks
│   └── pre-commit             # Runs lint-staged before commit
├── .idea/                      # JetBrains IDE config
├── .vscode/                    # VS Code config
│   ├── extensions.json        # Recommended extensions
│   └── settings.json          # Workspace settings
├── docs/                       # Documentation site (Nuxt + Content)
│   ├── content/               # Documentation content
│   │   └── index.md          # Home page
│   ├── app.vue               # Nuxt app component
│   ├── nuxt.config.ts        # Nuxt configuration
│   ├── package.json          # Docs dependencies
│   └── tsconfig.json         # Docs TypeScript config
├── packages/                   # Workspace packages
│   └── vue-funnel/           # Main library package
│       ├── src/
│       │   ├── composables/
│       │   │   └── useFunnel.ts    # Core composable implementation
│       │   └── index.ts            # Package exports
│       ├── test/
│       │   └── useFunnel.test.ts   # Test suite
│       ├── build.config.ts         # unbuild configuration
│       ├── package.json            # Package manifest
│       ├── tsconfig.json           # TypeScript config
│       └── vitest.config.ts        # Vitest configuration
├── .gitignore                  # Git ignore rules
├── .npmrc                      # pnpm configuration
├── .prettierrc                 # Prettier configuration
├── CONTRIBUTING.md             # Contribution guidelines
├── eslint.config.js           # ESLint configuration (@antfu/eslint-config)
├── LICENSE                     # MIT License
├── package.json               # Root package.json
├── pnpm-lock.yaml            # pnpm lockfile
├── pnpm-workspace.yaml       # pnpm workspace configuration
├── PROJECT_STRUCTURE.md       # This file
├── README.ko.md              # Korean README
├── README.md                 # English README
├── SETUP.md                  # Development setup guide
├── tsconfig.base.json        # Base TypeScript configuration
├── tsconfig.json             # Root TypeScript project references
└── turbo.json                # Turborepo configuration
```

## Key Files Explained

### Root Configuration

| File | Purpose |
|------|---------|
| `package.json` | Root package with dev dependencies and scripts |
| `pnpm-workspace.yaml` | Defines workspace packages |
| `turbo.json` | Turborepo task pipeline configuration |
| `tsconfig.base.json` | Shared TypeScript settings |
| `tsconfig.json` | TypeScript project references |
| `eslint.config.js` | ESLint rules with @antfu/eslint-config |
| `.prettierrc` | Code formatting rules |
| `.npmrc` | pnpm behavior settings |

### Library Package (`packages/vue-funnel`)

| File | Purpose |
|------|---------|
| `src/index.ts` | Package entry point, exports |
| `src/composables/useFunnel.ts` | Main composable implementation |
| `test/useFunnel.test.ts` | Test suite with Vitest |
| `package.json` | Package metadata and dependencies |
| `build.config.ts` | unbuild configuration for building |
| `vitest.config.ts` | Test configuration |
| `tsconfig.json` | TypeScript compilation settings |

### Documentation (`docs`)

| File | Purpose |
|------|---------|
| `nuxt.config.ts` | Nuxt and Content module configuration |
| `content/index.md` | Documentation home page |
| `app.vue` | Root Vue component |
| `package.json` | Docs dependencies |

## Package Manager: pnpm

This project uses **pnpm** with workspaces for:
- Efficient disk space usage (hard links)
- Strict dependency resolution
- Fast installation
- Monorepo support

## Build System: Turborepo

**Turborepo** provides:
- Task caching for faster builds
- Parallel task execution
- Dependency-aware task orchestration
- Remote caching support (future)

## Tech Stack Summary

### Library
- **Vue 3** - Core framework
- **TypeScript** - Type safety
- **unbuild** - Zero-config bundler
- **Vitest** - Unit testing
- **@vue/test-utils** - Component testing

### Documentation
- **Nuxt 3** - Full-stack framework
- **Nuxt Content** - File-based CMS
- **TailwindCSS** - Styling

### Development
- **pnpm** - Package manager
- **Turborepo** - Build orchestration
- **@antfu/eslint-config** - Linting
- **Prettier** - Formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit checks

## Scripts Overview

### Root Scripts

```json
{
  "build": "turbo run build",           // Build all packages
  "dev": "turbo run dev",               // Run all dev servers
  "test": "turbo run test",             // Run all tests
  "lint": "turbo run lint",             // Lint all packages
  "format": "prettier --write ...",     // Format all code
  "typecheck": "turbo run typecheck",   // Type check all
  "clean": "turbo run clean && ...",    // Clean all
  "prepare": "husky"                    // Setup git hooks
}
```

### Library Scripts

```json
{
  "build": "unbuild",                   // Build with unbuild
  "dev": "unbuild --stub",              // Dev mode with stubbing
  "test": "vitest",                     // Run tests
  "test:ui": "vitest --ui",            // Test UI
  "test:coverage": "vitest --coverage", // Coverage report
  "typecheck": "vue-tsc --noEmit",     // Type check
  "lint": "eslint .",                   // Lint
  "clean": "rm -rf dist ..."            // Clean build
}
```

### Docs Scripts

```json
{
  "dev": "nuxi dev",                    // Dev server
  "build": "nuxi build",                // Production build
  "generate": "nuxi generate",          // Static generation
  "preview": "nuxi preview",            // Preview build
  "typecheck": "nuxi typecheck",        // Type check
  "clean": "rm -rf .nuxt ..."          // Clean
}
```

## Workspace Dependencies

### Shared DevDependencies (Root)
- `@antfu/eslint-config` - ESLint configuration
- `eslint` - Linting
- `prettier` - Formatting
- `typescript` - Type checking
- `turbo` - Build system
- `husky` - Git hooks
- `lint-staged` - Pre-commit checks
- `vitest` - Testing framework

### Library Dependencies
- `vue` (peer) - Vue 3 framework
- `unbuild` - Build tool
- `vitest` - Testing
- `@vue/test-utils` - Testing utilities
- `vue-tsc` - Type checking

### Docs Dependencies
- `nuxt` - Framework
- `@nuxt/content` - Content management
- `@nuxtjs/tailwindcss` - Styling

## Development Workflow

1. **Install**: `pnpm install`
2. **Develop**: `pnpm --filter vue-funnel dev`
3. **Test**: `pnpm --filter vue-funnel test`
4. **Build**: `pnpm build`
5. **Docs**: `pnpm --filter docs dev`
6. **Lint**: `pnpm lint`
7. **Commit**: Git hooks run automatically

## CI/CD (Future)

Planned GitHub Actions:
- Build and test on PR
- Type checking
- Linting
- Coverage reports
- Automated releases
- Documentation deployment

## Next Steps

To complete the setup:
1. Run `pnpm install`
2. Run `pnpm build`
3. Run `pnpm test`
4. Start docs: `pnpm --filter docs dev`

See [SETUP.md](./SETUP.md) for detailed setup instructions.

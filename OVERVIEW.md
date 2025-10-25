# Vue Funnel - Project Overview

## 🎯 Project Goal

Convert Toss's [@toss/use-funnel](https://github.com/toss/use-funnel) from React to Vue 3, providing a type-safe, declarative way to manage multi-step funnels in Vue applications.

## 📦 Monorepo Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     vue-funnel                          │
│                  (pnpm workspace)                       │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
┌───────▼──────┐                   ┌────────▼────────┐
│   packages/  │                   │      docs/      │
│  vue-funnel  │                   │  (Nuxt + Content)│
│              │                   │                 │
│  Library     │                   │  Documentation  │
│  Package     │                   │  Site           │
└──────────────┘                   └─────────────────┘
```

## 🏗️ Technology Stack

### Build System
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│     pnpm     │────▶│   Turborepo  │────▶│   Packages   │
│  Workspaces  │     │   Pipeline   │     │   Parallel   │
└──────────────┘     └──────────────┘     └──────────────┘
```

### Library Stack
```
Vue 3
  │
  ├─▶ TypeScript (Type Safety)
  ├─▶ unbuild (Bundling)
  ├─▶ Vitest (Testing)
  └─▶ @vue/test-utils (Component Testing)
```

### Documentation Stack
```
Nuxt 3
  │
  ├─▶ Nuxt Content (Markdown CMS)
  ├─▶ TailwindCSS (Styling)
  └─▶ Vue Router (Navigation)
```

### Code Quality Stack
```
Source Code
  │
  ├─▶ @antfu/eslint-config (Linting)
  ├─▶ Prettier (Formatting)
  ├─▶ TypeScript (Type Checking)
  └─▶ Husky + lint-staged (Pre-commit)
```

## 🔄 Development Workflow

```
┌─────────────┐
│  Developer  │
└──────┬──────┘
       │
       ├─▶ Edit Code
       │      │
       │      ├─▶ TypeScript Type Check
       │      ├─▶ ESLint (Auto-fix)
       │      └─▶ Prettier (Format)
       │
       ├─▶ Run Tests (Vitest)
       │      │
       │      └─▶ Coverage Report
       │
       ├─▶ Build (Turborepo)
       │      │
       │      ├─▶ Cache Check
       │      └─▶ Parallel Build
       │
       └─▶ Git Commit
              │
              ├─▶ Husky Hook
              ├─▶ lint-staged
              │      ├─▶ ESLint
              │      └─▶ Prettier
              │
              └─▶ Commit Success ✅
```

## 📊 Package Structure

### vue-funnel Library

```
packages/vue-funnel/
├── src/
│   ├── composables/
│   │   └── useFunnel.ts          ← Core composable
│   └── index.ts                  ← Public API
├── test/
│   └── useFunnel.test.ts         ← Tests
├── build.config.ts               ← unbuild config
├── vitest.config.ts              ← Test config
├── tsconfig.json                 ← TS config
└── package.json                  ← Package metadata

Exports:
  ├─▶ ESM: dist/index.mjs
  ├─▶ CJS: dist/index.cjs
  └─▶ Types: dist/index.d.ts
```

### Documentation

```
docs/
├── content/
│   └── index.md                  ← Markdown content
├── app.vue                       ← Root component
├── nuxt.config.ts                ← Nuxt config
├── package.json                  ← Docs dependencies
└── tsconfig.json                 ← TS config

Output:
  └─▶ Static Site (.output/)
```

## 🎨 API Design

### useFunnel Composable

```typescript
// Usage
const { Funnel, Step, setStep, currentStep, steps } = useFunnel(
  ['step1', 'step2', 'step3'] as const,
  {
    initialStep: 'step1',
    queryParam: 'step',
    historyMode: 'push'
  }
)

// Returns
{
  Funnel: Component        // Container component
  Step: Component          // Step component
  setStep: Function        // Navigate to step
  currentStep: Ref         // Current step name
  steps: readonly string[] // All steps
}
```

### Component Architecture

```
<Funnel>                              ← Container
  │
  ├─▶ <Step name="step1">            ← Only renders if active
  │     └─▶ User Content
  │
  ├─▶ <Step name="step2">
  │     └─▶ User Content
  │
  └─▶ <Step name="step3">
        └─▶ User Content
```

## 🧪 Testing Strategy

```
Test Suite (Vitest)
  │
  ├─▶ Unit Tests
  │     ├─▶ Initialization
  │     ├─▶ Navigation
  │     ├─▶ URL Sync
  │     └─▶ History Mode
  │
  ├─▶ Component Tests
  │     ├─▶ Funnel Rendering
  │     ├─▶ Step Switching
  │     └─▶ Props Validation
  │
  └─▶ Type Tests
        └─▶ Type Inference
```

## 📈 Build Pipeline (Turborepo)

```
pnpm build
  │
  ├─▶ Check Cache
  │     └─▶ Hit? Skip build ⚡
  │
  └─▶ Execute Pipeline
        │
        ├─▶ vue-funnel
        │     ├─▶ unbuild
        │     └─▶ Generate types
        │
        └─▶ docs (depends on vue-funnel)
              └─▶ nuxi build
```

## 📝 Documentation Files

```
Root Documentation
├── README.md                    ← Library usage
├── README.ko.md                 ← Korean version
├── QUICKSTART.md                ← 5-minute start
├── SETUP.md                     ← Detailed setup
├── CONTRIBUTING.md              ← Contribution guide
├── PROJECT_STRUCTURE.md         ← Architecture
├── SUMMARY.md                   ← Setup summary
└── OVERVIEW.md                  ← This file
```

## 🚀 Getting Started Flow

```
1. Prerequisites
   └─▶ Node.js ≥ 18.0.0
   └─▶ pnpm ≥ 9.0.0

2. Install
   └─▶ pnpm install

3. Build
   └─▶ pnpm build

4. Test
   └─▶ pnpm test

5. Develop
   ├─▶ pnpm --filter vue-funnel dev
   └─▶ pnpm --filter docs dev
```

## 🎯 Key Features

```
✅ Type-Safe Navigation
   └─▶ Full TypeScript support with inference

✅ Declarative API
   └─▶ Vue components for clean templates

✅ URL Synchronization
   └─▶ Query parameters for shareable states

✅ History Integration
   └─▶ Browser back/forward support

✅ Zero Dependencies
   └─▶ Only peer dependency: Vue 3

✅ SSR Compatible
   └─▶ Works with Nuxt.js

✅ Tested
   └─▶ Comprehensive test coverage
```

## 📚 Resources

### Documentation
- [QUICKSTART.md](./QUICKSTART.md) - Quick start guide
- [SETUP.md](./SETUP.md) - Development setup
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Detailed structure
- [CONTRIBUTING.md](./CONTRIBUTING.md) - How to contribute

### References
- [Toss use-funnel](https://github.com/toss/use-funnel) - Original React library
- [Vue 3 Docs](https://vuejs.org) - Vue documentation
- [pnpm](https://pnpm.io) - Package manager
- [Turborepo](https://turbo.build) - Build system

---

## 🎉 Ready to Code!

The complete monorepo setup is ready for development. Run `pnpm install` to get started!

**Author**: Minsu Lee (이민수) - [@amondnet](https://github.com/amondnet)

**License**: MIT

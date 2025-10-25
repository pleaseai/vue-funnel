# vue-funnel

> Vue.js implementation of [@toss/use-funnel](https://github.com/toss/use-funnel) - A powerful composable for managing multi-step user flows

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[한국어](./README.ko.md) | English

## Overview

`vue-funnel` is a Vue 3 composable that provides a declarative way to manage multi-step funnels (wizards, form flows, onboarding processes) with type-safe step navigation and state management.

This project is a Vue.js conversion of Toss's popular React library [@toss/use-funnel](https://github.com/toss/use-funnel).

## Features

- **Type-Safe Navigation**: Full TypeScript support with type inference for steps and state
- **Declarative API**: Define your funnel flow with intuitive Vue components
- **URL State Management**: Automatic query parameter synchronization (optional)
- **History Control**: Built-in browser history integration
- **Composable-First**: Built with Vue 3 Composition API
- **Zero Dependencies**: Lightweight with no external runtime dependencies
- **SSR Compatible**: Works with Nuxt.js and other SSR frameworks

## Installation

```bash
# npm
npm install vue-funnel

# yarn
yarn add vue-funnel

# pnpm
pnpm add vue-funnel
```

## Quick Start

```vue
<script setup lang="ts">
import { useFunnel } from 'vue-funnel'

const { Funnel, Step, setStep } = useFunnel(['start', 'profile', 'complete'] as const)

const handleNext = () => {
  setStep('profile')
}

const handleComplete = () => {
  setStep('complete')
}
</script>

<template>
  <Funnel>
    <Step name="start">
      <div>
        <h1>Welcome!</h1>
        <button @click="handleNext">Start</button>
      </div>
    </Step>

    <Step name="profile">
      <div>
        <h1>Profile Setup</h1>
        <button @click="handleComplete">Complete</button>
      </div>
    </Step>

    <Step name="complete">
      <div>
        <h1>All Done!</h1>
      </div>
    </Step>
  </Funnel>
</template>
```

## Core Concepts

### Steps

Steps are the individual screens in your funnel. Each step is uniquely identified by a name.

```ts
const steps = ['welcome', 'details', 'confirm', 'success'] as const
```

### State Management

Manage state across steps using Vue's reactive system:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useFunnel } from 'vue-funnel'

interface FunnelState {
  name: string
  email: string
  age: number
}

const state = ref<FunnelState>({
  name: '',
  email: '',
  age: 0
})

const { Funnel, Step, setStep } = useFunnel(['info', 'confirm', 'complete'] as const)

const handleSaveInfo = () => {
  setStep('confirm')
}
</script>

<template>
  <Funnel>
    <Step name="info">
      <input v-model="state.name" placeholder="Name" />
      <input v-model="state.email" placeholder="Email" />
      <button @click="handleSaveInfo">Next</button>
    </Step>

    <Step name="confirm">
      <p>Name: {{ state.name }}</p>
      <p>Email: {{ state.email }}</p>
      <button @click="setStep('complete')">Confirm</button>
    </Step>

    <Step name="complete">
      <h1>Thank you, {{ state.name }}!</h1>
    </Step>
  </Funnel>
</template>
```

### URL Query Parameter Integration

Sync funnel state with URL query parameters:

```ts
const { Funnel, Step, setStep } = useFunnel(
  ['start', 'middle', 'end'] as const,
  {
    initialStep: 'start',
    queryParam: 'step', // URL will be ?step=start
  }
)
```

### History Management

Control browser history behavior:

```ts
const { Funnel, Step, setStep } = useFunnel(steps, {
  // 'push' - adds new history entry (default)
  // 'replace' - replaces current history entry
  historyMode: 'push'
})
```

## Advanced Usage

### Conditional Steps

```vue
<script setup lang="ts">
const showOptionalStep = ref(false)

const steps = computed(() => {
  const baseSteps = ['start', 'required']
  if (showOptionalStep.value) {
    baseSteps.push('optional')
  }
  baseSteps.push('end')
  return baseSteps
})

const { Funnel, Step, setStep } = useFunnel(steps)
</script>
```

### Step Guards

Prevent navigation under certain conditions:

```vue
<script setup lang="ts">
const canProceed = ref(false)

const handleNext = () => {
  if (!canProceed.value) {
    alert('Please complete the form first')
    return
  }
  setStep('next')
}
</script>
```

### Custom Transitions

Add animations between steps:

```vue
<template>
  <Funnel>
    <Transition name="slide">
      <Step name="step1">
        <!-- content -->
      </Step>
    </Transition>
  </Funnel>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
```

## API Reference

### `useFunnel(steps, options?)`

Creates a funnel instance.

**Parameters:**

- `steps`: `readonly string[]` - Array of step names
- `options?`: `FunnelOptions` - Configuration options
  - `initialStep?`: `string` - Starting step (defaults to first step)
  - `queryParam?`: `string` - URL query parameter name for step sync
  - `historyMode?`: `'push' | 'replace'` - Browser history behavior

**Returns:**

- `Funnel`: Component to wrap all steps
- `Step`: Component for individual steps
- `setStep`: Function to navigate to a specific step
- `currentStep`: Ref containing current step name
- `steps`: Readonly array of all step names

### Components

#### `<Funnel>`

Container component for all steps. Renders only the currently active step.

**Props:**
- None (controlled by `useFunnel`)

#### `<Step>`

Individual step component.

**Props:**
- `name`: `string` (required) - Unique identifier for the step

## Nuxt.js Integration

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['vue-funnel/nuxt']
})
```

Then use in your components:

```vue
<script setup lang="ts">
const { Funnel, Step, setStep } = useFunnel(['welcome', 'form', 'done'] as const)
</script>
```

## Comparison with Original

| Feature | @toss/use-funnel (React) | vue-funnel (Vue) |
|---------|-------------------------|------------------|
| Multi-step flows | ✅ | ✅ |
| Type safety | ✅ | ✅ |
| URL sync | ✅ | ✅ |
| History control | ✅ | ✅ |
| Framework | React | Vue 3 |
| API Style | Hooks | Composables |

## Examples

Check out the [examples](./examples) directory for complete implementations:

- [Basic Funnel](./examples/basic)
- [Form Wizard](./examples/form-wizard)
- [Onboarding Flow](./examples/onboarding)
- [E-commerce Checkout](./examples/checkout)

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

## License

MIT © [Minsu Lee](https://github.com/amondnet)

## Acknowledgments

This project is inspired by and based on [@toss/use-funnel](https://github.com/toss/use-funnel) by Toss.

## Links

- [Original Library (React)](https://github.com/toss/use-funnel)
- [Documentation](https://use-funnel.slash.page/ko)
- [GitHub Repository](https://github.com/amondnet/vue-funnel)
- [Issue Tracker](https://github.com/amondnet/vue-funnel/issues)

---

Made with ❤️ by [Minsu Lee](https://github.com/amondnet)
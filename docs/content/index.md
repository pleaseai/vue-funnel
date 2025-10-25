# vue-funnel

Type-safe multi-step funnels for Vue 3

## Quick Start

Install the package:

```bash
pnpm add vue-funnel
```

Use in your Vue component:

```vue
<script setup lang="ts">
import { useFunnel } from 'vue-funnel'

const { Funnel, Step, setStep } = useFunnel(['start', 'profile', 'complete'] as const)
</script>

<template>
  <Funnel>
    <Step name="start">
      <h1>Welcome!</h1>
      <button @click="setStep('profile')">Start</button>
    </Step>

    <Step name="profile">
      <h1>Profile Setup</h1>
      <button @click="setStep('complete')">Complete</button>
    </Step>

    <Step name="complete">
      <h1>All Done!</h1>
    </Step>
  </Funnel>
</template>
```

## Features

- ✅ Type-safe navigation with TypeScript
- ✅ Declarative API with Vue components
- ✅ URL query parameter synchronization
- ✅ Browser history integration
- ✅ Zero dependencies
- ✅ SSR compatible

## Learn More

- [GitHub Repository](https://github.com/amondnet/vue-funnel)
- [Quick Start Guide](/QUICKSTART.md)
- [Setup Guide](/SETUP.md)
- [Contributing](/CONTRIBUTING.md)

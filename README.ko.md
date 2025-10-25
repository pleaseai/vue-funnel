# vue-funnel

> [@toss/use-funnel](https://github.com/toss/use-funnel)의 Vue.js 구현 - 다단계 사용자 플로우를 관리하는 강력한 컴포저블

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

한국어 | [English](./README.md)

## 개요

`vue-funnel`은 타입 안전한 단계 탐색과 상태 관리를 통해 다단계 퍼널(위저드, 폼 플로우, 온보딩 프로세스)을 선언적으로 관리할 수 있는 Vue 3 컴포저블입니다.

이 프로젝트는 Toss의 인기 있는 React 라이브러리 [@toss/use-funnel](https://github.com/toss/use-funnel)을 Vue.js로 변환한 것입니다.

## 특징

- **타입 안전한 탐색**: 단계와 상태에 대한 타입 추론을 완벽하게 지원하는 TypeScript
- **선언적 API**: 직관적인 Vue 컴포넌트로 퍼널 플로우 정의
- **URL 상태 관리**: 자동 쿼리 파라미터 동기화 (선택 사항)
- **히스토리 제어**: 내장된 브라우저 히스토리 통합
- **컴포저블 우선**: Vue 3 Composition API로 구축
- **의존성 없음**: 외부 런타임 의존성이 없는 경량 라이브러리
- **SSR 호환**: Nuxt.js 및 기타 SSR 프레임워크와 호환

## 설치

```bash
# npm
npm install vue-funnel

# yarn
yarn add vue-funnel

# pnpm
pnpm add vue-funnel
```

## 빠른 시작

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
        <h1>환영합니다!</h1>
        <button @click="handleNext">시작하기</button>
      </div>
    </Step>

    <Step name="profile">
      <div>
        <h1>프로필 설정</h1>
        <button @click="handleComplete">완료</button>
      </div>
    </Step>

    <Step name="complete">
      <div>
        <h1>모두 완료되었습니다!</h1>
      </div>
    </Step>
  </Funnel>
</template>
```

## 핵심 개념

### 단계 (Steps)

단계는 퍼널의 개별 화면입니다. 각 단계는 이름으로 고유하게 식별됩니다.

```ts
const steps = ['welcome', 'details', 'confirm', 'success'] as const
```

### 상태 관리

Vue의 반응형 시스템을 사용하여 단계 간 상태를 관리합니다:

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
      <input v-model="state.name" placeholder="이름" />
      <input v-model="state.email" placeholder="이메일" />
      <button @click="handleSaveInfo">다음</button>
    </Step>

    <Step name="confirm">
      <p>이름: {{ state.name }}</p>
      <p>이메일: {{ state.email }}</p>
      <button @click="setStep('complete')">확인</button>
    </Step>

    <Step name="complete">
      <h1>감사합니다, {{ state.name }}님!</h1>
    </Step>
  </Funnel>
</template>
```

### URL 쿼리 파라미터 통합

퍼널 상태를 URL 쿼리 파라미터와 동기화합니다:

```ts
const { Funnel, Step, setStep } = useFunnel(
  ['start', 'middle', 'end'] as const,
  {
    initialStep: 'start',
    queryParam: 'step', // URL은 ?step=start가 됩니다
  }
)
```

### 히스토리 관리

브라우저 히스토리 동작을 제어합니다:

```ts
const { Funnel, Step, setStep } = useFunnel(steps, {
  // 'push' - 새 히스토리 항목 추가 (기본값)
  // 'replace' - 현재 히스토리 항목 교체
  historyMode: 'push'
})
```

## 고급 사용법

### 조건부 단계

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

### 단계 가드

특정 조건에서 탐색을 방지합니다:

```vue
<script setup lang="ts">
const canProceed = ref(false)

const handleNext = () => {
  if (!canProceed.value) {
    alert('먼저 폼을 완성해주세요')
    return
  }
  setStep('next')
}
</script>
```

### 커스텀 전환 효과

단계 간 애니메이션을 추가합니다:

```vue
<template>
  <Funnel>
    <Transition name="slide">
      <Step name="step1">
        <!-- 내용 -->
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

## API 레퍼런스

### `useFunnel(steps, options?)`

퍼널 인스턴스를 생성합니다.

**파라미터:**

- `steps`: `readonly string[]` - 단계 이름 배열
- `options?`: `FunnelOptions` - 구성 옵션
  - `initialStep?`: `string` - 시작 단계 (기본값: 첫 번째 단계)
  - `queryParam?`: `string` - 단계 동기화를 위한 URL 쿼리 파라미터 이름
  - `historyMode?`: `'push' | 'replace'` - 브라우저 히스토리 동작

**반환값:**

- `Funnel`: 모든 단계를 감싸는 컴포넌트
- `Step`: 개별 단계 컴포넌트
- `setStep`: 특정 단계로 이동하는 함수
- `currentStep`: 현재 단계 이름을 포함하는 Ref
- `steps`: 모든 단계 이름의 읽기 전용 배열

### 컴포넌트

#### `<Funnel>`

모든 단계를 위한 컨테이너 컴포넌트. 현재 활성화된 단계만 렌더링합니다.

**Props:**
- 없음 (`useFunnel`에 의해 제어됨)

#### `<Step>`

개별 단계 컴포넌트.

**Props:**
- `name`: `string` (필수) - 단계의 고유 식별자

## Nuxt.js 통합

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['vue-funnel/nuxt']
})
```

그런 다음 컴포넌트에서 사용:

```vue
<script setup lang="ts">
const { Funnel, Step, setStep } = useFunnel(['welcome', 'form', 'done'] as const)
</script>
```

## 원본과의 비교

| 기능 | @toss/use-funnel (React) | vue-funnel (Vue) |
|------|-------------------------|------------------|
| 다단계 플로우 | ✅ | ✅ |
| 타입 안전성 | ✅ | ✅ |
| URL 동기화 | ✅ | ✅ |
| 히스토리 제어 | ✅ | ✅ |
| 프레임워크 | React | Vue 3 |
| API 스타일 | Hooks | Composables |

## 예제

전체 구현은 [examples](./examples) 디렉토리를 확인하세요:

- [기본 퍼널](./examples/basic)
- [폼 위저드](./examples/form-wizard)
- [온보딩 플로우](./examples/onboarding)
- [전자상거래 결제](./examples/checkout)

## 기여하기

기여를 환영합니다! 자세한 내용은 [기여 가이드](./CONTRIBUTING.md)를 읽어주세요.

## 라이선스

MIT © [이민수](https://github.com/amondnet)

## 감사의 말

이 프로젝트는 Toss의 [@toss/use-funnel](https://github.com/toss/use-funnel)에서 영감을 받아 제작되었습니다.

## 링크

- [원본 라이브러리 (React)](https://github.com/toss/use-funnel)
- [문서](https://use-funnel.slash.page/ko)
- [GitHub 저장소](https://github.com/amondnet/vue-funnel)
- [이슈 트래커](https://github.com/amondnet/vue-funnel/issues)

---

[이민수](https://github.com/amondnet)가 ❤️를 담아 만들었습니다
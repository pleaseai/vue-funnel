import type { Component, Ref } from 'vue'
import { computed, defineComponent, h, ref, watch } from 'vue'

export interface FunnelOptions {
  /**
   * Initial step name. Defaults to the first step.
   */
  initialStep?: string
  /**
   * Query parameter name for URL synchronization.
   * If provided, the current step will be synced with the URL query parameter.
   */
  queryParam?: string
  /**
   * Browser history mode: 'push' or 'replace'.
   * @default 'push'
   */
  historyMode?: 'push' | 'replace'
}

export interface UseFunnelReturn<TStep extends readonly string[]> {
  /**
   * Container component for all funnel steps
   */
  Funnel: Component
  /**
   * Individual step component
   */
  Step: Component
  /**
   * Navigate to a specific step
   */
  setStep: (step: TStep[number]) => void
  /**
   * Current active step name
   */
  currentStep: Ref<TStep[number]>
  /**
   * All available steps
   */
  steps: TStep
}

/**
 * Create a type-safe funnel for managing multi-step flows
 *
 * @example
 * ```ts
 * const { Funnel, Step, setStep } = useFunnel(['start', 'profile', 'complete'] as const)
 * ```
 */
export function useFunnel<TStep extends readonly string[]>(
  steps: TStep,
  options: FunnelOptions = {},
): UseFunnelReturn<TStep> {
  const {
    initialStep = steps[0],
    queryParam,
    historyMode = 'push',
  } = options

  // Get initial step from URL if queryParam is provided
  const getInitialStep = (): TStep[number] => {
    if (queryParam && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const stepFromUrl = params.get(queryParam)
      if (stepFromUrl && steps.includes(stepFromUrl as TStep[number])) {
        return stepFromUrl as TStep[number]
      }
    }
    return initialStep as TStep[number]
  }

  const currentStep = ref<TStep[number]>(getInitialStep())

  // Sync with URL query parameter
  const syncUrlParam = (step: TStep[number]) => {
    if (queryParam && typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set(queryParam, step)

      if (historyMode === 'push') {
        window.history.pushState({}, '', url.toString())
      }
      else {
        window.history.replaceState({}, '', url.toString())
      }
    }
  }

  // Watch for currentStep changes and sync with URL
  watch(currentStep, (newStep) => {
    syncUrlParam(newStep)
  })

  // Listen for browser back/forward navigation
  if (queryParam && typeof window !== 'undefined') {
    window.addEventListener('popstate', () => {
      const params = new URLSearchParams(window.location.search)
      const stepFromUrl = params.get(queryParam)
      if (stepFromUrl && steps.includes(stepFromUrl as TStep[number])) {
        currentStep.value = stepFromUrl as TStep[number]
      }
    })
  }

  const setStep = (step: TStep[number]) => {
    if (!steps.includes(step)) {
      console.warn(`[useFunnel] Invalid step: ${step}`)
      return
    }
    currentStep.value = step
  }

  // Funnel component - renders only the current step
  const Funnel = defineComponent({
    name: 'Funnel',
    setup(_, { slots }) {
      return () => {
        const children = slots.default?.() || []
        const activeStep = children.find((child) => {
          return child.props?.name === currentStep.value
        })
        return activeStep || null
      }
    },
  })

  // Step component
  const Step = defineComponent({
    name: 'FunnelStep',
    props: {
      name: {
        type: String,
        required: true,
      },
    },
    setup(props, { slots }) {
      const isActive = computed(() => currentStep.value === props.name)

      return () => {
        if (!isActive.value)
          return null
        return h('div', { class: 'funnel-step' }, slots.default?.())
      }
    },
  })

  return {
    Funnel,
    Step,
    setStep,
    currentStep,
    steps,
  }
}

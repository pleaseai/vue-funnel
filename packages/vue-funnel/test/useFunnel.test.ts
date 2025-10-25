import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { useFunnel } from '../src/composables/useFunnel'

describe('useFunnel', () => {
  beforeEach(() => {
    // Reset window location
    window.history.replaceState({}, '', '/')
  })

  it('should initialize with first step by default', () => {
    const { currentStep } = useFunnel(['step1', 'step2', 'step3'] as const)
    expect(currentStep.value).toBe('step1')
  })

  it('should initialize with specified initial step', () => {
    const { currentStep } = useFunnel(['step1', 'step2', 'step3'] as const, {
      initialStep: 'step2',
    })
    expect(currentStep.value).toBe('step2')
  })

  it('should navigate to different steps', () => {
    const { currentStep, setStep } = useFunnel(['step1', 'step2', 'step3'] as const)

    expect(currentStep.value).toBe('step1')

    setStep('step2')
    expect(currentStep.value).toBe('step2')

    setStep('step3')
    expect(currentStep.value).toBe('step3')
  })

  it('should warn when navigating to invalid step', () => {
    const { setStep } = useFunnel(['step1', 'step2'] as const)
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    // @ts-expect-error - Testing invalid step
    setStep('invalid')

    expect(warnSpy).toHaveBeenCalledWith('[useFunnel] Invalid step: invalid')
    warnSpy.mockRestore()
  })

  it('should render only the current step', async () => {
    const { Funnel, Step, setStep } = useFunnel(['step1', 'step2'] as const)

    const wrapper = mount({
      components: { Funnel, Step },
      template: `
        <Funnel>
          <Step name="step1">
            <div data-testid="step1">Step 1 Content</div>
          </Step>
          <Step name="step2">
            <div data-testid="step2">Step 2 Content</div>
          </Step>
        </Funnel>
      `,
    })

    // Initially should show step1
    expect(wrapper.find('[data-testid="step1"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="step2"]').exists()).toBe(false)

    // Navigate to step2
    setStep('step2')
    await nextTick()

    expect(wrapper.find('[data-testid="step1"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="step2"]').exists()).toBe(true)
  })

  it('should sync with URL query parameter', async () => {
    const { setStep } = useFunnel(['step1', 'step2', 'step3'] as const, {
      queryParam: 'step',
    })

    setStep('step2')
    await nextTick()

    expect(window.location.search).toBe('?step=step2')

    setStep('step3')
    await nextTick()

    expect(window.location.search).toBe('?step=step3')
  })

  it('should use replace mode for history', async () => {
    const { setStep } = useFunnel(['step1', 'step2'] as const, {
      queryParam: 'step',
      historyMode: 'replace',
    })

    const replaceSpy = vi.spyOn(window.history, 'replaceState')

    setStep('step2')
    await nextTick()

    expect(replaceSpy).toHaveBeenCalled()
    replaceSpy.mockRestore()
  })

  it('should initialize from URL query parameter', () => {
    window.history.replaceState({}, '', '?step=step2')

    const { currentStep } = useFunnel(['step1', 'step2', 'step3'] as const, {
      queryParam: 'step',
    })

    expect(currentStep.value).toBe('step2')
  })

  it('should have correct type inference', () => {
    const steps = ['welcome', 'profile', 'complete'] as const
    const { setStep, currentStep } = useFunnel(steps)

    // Type tests - these should not have TypeScript errors
    setStep('welcome')
    setStep('profile')
    setStep('complete')

    // currentStep should be of type 'welcome' | 'profile' | 'complete'
    const step: typeof steps[number] = currentStep.value
    expect(['welcome', 'profile', 'complete']).toContain(step)
  })
})

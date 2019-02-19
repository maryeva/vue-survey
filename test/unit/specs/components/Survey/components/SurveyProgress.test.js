import { mount } from '@vue/test-utils'
import ProgressBar from '@/components/Shared/ProgressBar'

describe('ProgressBar', () => {
  let wrapper
  const $route = {
    path: 'name'
  }

  beforeEach(() => {
    wrapper = mount(ProgressBar, {
      propsData: {
        currentStep: 1,
        totalSteps: 5
      },
      mocks: {
        $route
      }
    })
  })

  it('sets initial values', () => {
    expect(wrapper.vm.currentStep).toEqual(1)
    expect(wrapper.vm.totalSteps).toEqual(5)
    expect(wrapper.vm.percentage).toEqual(20)
  })

  it('updates percentage when currentStep changes', () => {
    wrapper.setProps({ currentStep : 3 })
    expect(wrapper.vm.currentStep).toEqual(3)
    expect(wrapper.vm.percentage).toEqual(60)
  })

  it('percentage doesn\'t go above 100', () => {
    wrapper.setProps({ currentStep : 6 })
    expect(wrapper.vm.percentage).toEqual(100)
  })
})

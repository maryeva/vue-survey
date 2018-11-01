import { mount } from '@vue/test-utils'
import CheckButton from '@/components/Survey/components/CheckButton'

describe('CheckButton', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CheckButton, {
      propsData: {
        text: 'Lose weight',
        value: 'loseWeight',
        selected: false
      }
    })
  })

  it('should render the correct details', () => {
    expect(wrapper.text()).toContain('Lose weight')
    expect(wrapper.vm.value).toContain('loseWeight')
  })

  it('should have the correct details after being updated', () => {
    wrapper.setProps({ text: 'Sleep', value: 'sleep' })
    expect(wrapper.text()).toContain('Sleep')
    expect(wrapper.vm.value).toContain('sleep')
  })

  it('should emit the toggle when clicked', () => {
    wrapper.find('.check-button').trigger('click')
    expect(wrapper.emitted().toggle).toBeTruthy()
  })

  it('should update the class to have selected', () => {
    wrapper.setProps({ selected: true })
    expect(wrapper.find('.check-button').classes()).toContain('check-button--selected')
  })

  it('should not have the selected class when it is not selected', () => {
    wrapper.setProps({ selected: false })
    expect(wrapper.find('.check-button').classes()).not.toContain('check-button--selected')
  })
})

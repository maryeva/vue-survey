import { mount } from '@vue/test-utils'
import CheckButton from '@/components/Survey/components/CheckButton'

describe('CheckButton', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CheckButton, {
      propsData: {
        text: 'Test button',
        value: 'test',
        selected: true
      }
    })
  })

  it('initial render of selected button', () => {
    expect(wrapper.find('.check-button').text()).toEqual('Test button')
    expect(wrapper.find('.check-button').classes()).toContain('check-button--selected')
  })

  it('calls toggle function that prepares data to be stored', () => {
    wrapper.setMethods({ toggleSelectedItem:jest.fn() })
    wrapper.find('.check-button').trigger('click')

    expect(wrapper.vm.toggleSelectedItem).toHaveBeenCalledTimes(1)
  })

})

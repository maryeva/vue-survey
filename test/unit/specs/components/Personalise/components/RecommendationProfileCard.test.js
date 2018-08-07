import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import filters from '@/filters/filters.js'
import RecommendationProfileCard from '@/components/Personalise/components/RecommendationProfileCard'

describe('RecommendationProfileCard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(RecommendationProfileCard, {
      propsData: {
        profile: {
          id: 'profile1',
          attributes: {
            description: 'Profile 1 description',
            name: 'Profile 1',
            categories: ['Category'],
            lab: {
              processing_time: 10
            },
            sample: {
              collection_tube_variant: 'purple'
            }
          }
        },
        price: 4500,
        subscriptionAdditions: [],
        recommendation: {
          id: 'recommendation1',
          attributes: {
            category: 'Category',
            priority: 1,
            reasoning: 'reason1',
            summary: 'summary1'
          },
          relationships: {
            profile: {
              data: {
                id: 'profile1',
                type: 'profile'
              }
            }
          }
        },
        references: [],
        coreSubscriptionPanel: ''
      }
    })
  })

  it('renders the correct name', () => {
    expect(wrapper.text()).toContain('Profile 1')
  })

  it('renders the correct price', () => {
    expect(wrapper.text()).toContain('45.00')
  })

  it('renders the correct category "symbol"', () => {
    expect(wrapper.text()).toContain('C')
  })

  it('renders the correct category', () => {
    expect(wrapper.text()).toContain('Category')
  })

  it('renders the correct summary', () => {
    expect(wrapper.text()).toContain('summary1')
  })

  it('renders the correct reasoning', () => {
    expect(wrapper.text()).toContain('reason1')
  })

  it('renders the correct processing time', () => {
    expect(wrapper.text()).toContain('10 working days to process')
  })

  it('emits a buildSubscription event when button is clicked', async () => {
    const button = wrapper.find('button')
    button.trigger('click')
    await flushPromises()
    expect(wrapper.emitted('toggleProfile')).toBeTruthy()
  })
})

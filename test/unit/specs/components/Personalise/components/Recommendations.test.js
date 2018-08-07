import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import filters from '@/filters/filters.js'
import Recommendations from '@/components/Personalise/components/Recommendations'

describe('Recommendations', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Recommendations, {
      propsData: {
        loading: { 'resource/fetch/profile_recommendation': false },
        recommendations: [
          {
            id: 'recommendation1',
            attributes: {
              category: 'category',
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
              },
              references: {
                data: []
              }
            }
          }
        ],
        references: {},
        addedProfiles: [{
          id: 'profile2',
          attributes: {
            name: 'Profile 2'
          }
        }],
        profilePrices: {
          profile1: 1000
        },
        allProfiles: {
          profile1: {
            id: 'profile1',
            attributes: {
              name: 'Profile 1',
              lab: {
                processing_time: 1
              },
              sample: {
                collection_tube_variant: 'purple'
              }
            }
          }
        },
        coreSubscriptionPanel: {
          id: 'TPEHZG'
        }
      }
    })
  })

  it('renders the correct title when there are recommendations', () => {
    expect(wrapper.text()).toContain('1recommendation based on your results')
  })

  it('renders the correct title when there are no recommendations', () => {
    wrapper.setProps({ recommendations: {} })
    expect(wrapper.text()).toContain('You currently have no personal recommendations. Check back after your next set of results to see updates.')
  })
})

const chance = require('chance').Chance()
const moment = require('moment')

chance.mixin({
  // organization: () => {
  //   return {
  //     id: chance.hash({length: 16}),
  //     email: chance.email(),
  //     name: chance.sentence({ words: 4 }),
  //     phone: chance.phone({ country: "uk" }),
  //     description: chance.sentence(),
  //     logo: {
  //       large_url: chance.avatar({ protocol: 'https', fileExtension: 'png' }),
  //       medium_url: chance.avatar({ protocol: 'https', fileExtension: 'png' }),
  //       small_url: chance.avatar({ protocol: 'https', fileExtension: 'png' })
  //     },
  //     payment_options: {
  //       may_defer: chance.bool({ likelihood: 30 })
  //     },
  //     sample_collection_options: {
  //       may_manage: chance.bool({ likelihood: 20 })
  //     },
  //     specialities: chance.specialities(chance.integer({min: 1, max: 15}))
  //   }
  // },
  // client: () => {
  //   return {
  //     id: chance.hash({length: 16, casing: 'upper'}),
  //     first_name: chance.first(),
  //     last_name: chance.last(),
  //     gender: chance.gender().toLowerCase(),
  //     email: chance.email(),
  //     dob: moment(chance.birthday()).format('YYYY-MM-DD'),
  //     address: {
  //       city: chance.city(),
  //       postal_code: chance.postal(),
  //       line_1: chance.street(),
  //       line_2: null,
  //       state: chance.state({ country: 'uk', full: true })
  //     }
  //   }
  // },
  test: (params = {}) => {
    const created_at = moment().add(chance.integer({ min: -100, max: -4 }), 'days').format('YYYY-MM-DD')
    const scheduled_date = moment(created_at).add(3, 'days').format('YYYY-MM-DD')
    return {
      id: params.id || chance.hash({length: 6, casing: 'upper'}),
      attributes: {
        created_at,
        scheduled_date,
        price: chance.integer({min: 1000, max: 10000}),
        state: params.state || chance.pickone(['pending', 'processing', 'pending_review', 'complete', 'cancelled'])
      },
      relationships: {
        panel: { data: chance.panel() },
      }
    }
  },
  subscription: (params = {}) => {
    return {
      id: params.id || `S${chance.hash({length: 9, casing: 'upper'})}`,
      type: 'subscription',
      attributes: {
        created_at: moment().add(chance.integer({ min: -100, max: -4 }), 'days').format('YYYY-MM-DD'),
        price_per_test: chance.integer({min: 1000, max: 10000}),
        frequency: chance.pickset([ 'P1M', 'P2M', 'P3M', 'P6M', 'P1Y' ]),
        state: params.state || chance.pickset([ 'active', 'cancelled' ])
      },
      relationships: {
        panel: { data: params.panel } || { data: chance.panel() },
        test: params.test || { data: [] }
      }
    }
  },
  panel: (params = {}) => {
    return {
      id: params.id || `TP${chance.hash({length: 6, casing: 'upper'})}`,
      type: 'panel',
      attributes: {
        name: params.name || chance.sentence({ words: chance.integer({ min: 1, max: 4 }) }),
        price: params.price || chance.integer({min: 1000, max: 10000}),
        status: chance.pickset([ 'active', 'pending' ])
      },
      relationships: {
        profiles: { data: params.profiles } || { data: chance.generate(chance.profile, chance.integer({ min: 1, max: 10 })) }
      }
    }
  },
  profile: (params = {}) => {
    return {
      id: params.id || chance.syllable().toUpperCase(),
      type: 'profile',
      attributes: {
        name: params.name || chance.capitalize(chance.word()),
        lab_processing_time: 1,
        sample: {
          type: 'blood',
          collection_methods: ['finger_prick', 'venous'],
          collection_tube_variant: chance.pickone([ 'yellow', 'purple' ]),
          collection_instructions: { timing: 'Collect sample in morning' },
          collection_volume: 50
        }
      },
      relationships: {
        // biomarkers: chance.generate(chance.analyte(), chance.integer({ min: 1, max: 10 }))
      }
    }
  },
  profile_recommendation: (params = {}) => {
    let profile_id = params.profile_id || chance.syllable().toUpperCase()
    return {
      id: params.id || `${profile_id}_${chance.pickset([ 'self_rated', 'test_result' ])}`,
      type: 'profile_recommendation',
      attributes: {
        basis: [ chance.pickset([ 'Baz Foo', 'Foo bar' ]) ],
        category: chance.pickset([ 'Longevity', 'Wellness', 'Gambling' ]),
        priority: chance.integer({min: 1, max: 10}),
        reasoning: chance.sentence({ words: 50 }),
        summary: chance.sentence({ words: 15 })
      },
      relationships: {
        profile: { data: params.profile || chance.profile({ id: profile_id }) }
        // biomarkers: chance.generate(chance.analyte(), chance.integer({ min: 1, max: 10 }))
      }
    }
  },
  analyte: () => {
    return {
      id: chance.syllable().toUpperCase(),
      name: chance.capitalize(chance.word()),
      unit: chance.pickset([ '%', 'mmol/L' ]),
      result: chance.analyteResult()
    }
  },
  // analyteResult: () => {
  //   // could be improved
  //   return {
  //     analyte: chance.syllable().toUpperCase(),
  //     flag: chance.pickset([ 'high', 'low', null ]),
  //     lab_notes: null,
  //     processed_at: chance.birthday().toString(),
  //     reason_for_failure: null,
  //     reference_range: {
  //       max: 55,
  //       min: 20
  //     },
  //     reference_range_string: "20.0 - 55.0",
  //     successful: true,
  //     unit: chance.pickset([ '%', 'mmol/L' ]),
  //     value: chance.floating({ min: 0, max: 100 })
  //   }
  // },
  generate: (generator, amount, params) => {
    let result = {}
    for (let i = 0; i < amount; i++) {
      let id = chance.syllable().toUpperCase()
      result[id] = generator({ id, ...params })
    }
    return result
  }
})

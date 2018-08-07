const state = () => ({
  coreSubscriptions: {
    'TPEHZG': {
      data: {
        id: 'TPEHZG',
        type: 'panel',
        attributes: {
          name: 'Baseline',
          price: 4900,
          status: 'active'
        },
        relationships: {
          profiles: {
            data: [
              {
                type: 'profile',
                id: 'B12'
              },
              {
                type: 'profile',
                id: 'FERR'
              },
              {
                type: 'profile',
                id: 'LIPP'
              },
              {
                type: 'profile',
                id: 'LFT'
              },
              {
                type: 'profile',
                id: 'VITD'
              }
            ]
          }
        }
      }
    }
  }

})

export default state

const state = () => ({
  oneOffPanel: {},
  type: '',
  showProductCompare: false,
  fetchingProfilePrices: false,
  profilePrices: {
    'BVIT': 2100,
    'CRP': 1300,
    'CURRENT': null,
    'GHB': 1300,
    'ISP': 1400,
    'OMGI': 4500,
    'TEST': 1300,
    'TF': 1400
  },
  validProfiles: ['GHB', 'AB12', 'ISP', 'TEST', 'TF', 'CRP', 'OMGI', 'BVIT']
})

export default state

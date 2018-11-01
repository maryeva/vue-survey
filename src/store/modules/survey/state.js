const state = () => ({
  config: {
    surveyStages: [
      'name',
      'goals',
      'diet',
      'dob',
      'gender'
    ],
    selectedLimits: {
      goals: 4,
      diet: 1,
      gender: 1
    }
  },
  surveyData: {
    name: '',
    goals: {
      weightLoss: {
        name: 'Lose weight',
        selected: false
      },
      improveSleep: {
        name: 'Improve Sleep',
        selected: false
      },
      improveEnergy: {
        name: 'Improve Energy',
        selected: false
      },
      improveMood: {
        name: 'Improve my Mood',
        selected: false
      },
      improveFitness: {
        name: 'Improve my Fitness',
        selected: false
      }
    },
    diet: {
      no: {
        name: 'No',
        selected: false
      },
      vegan: {
        name: 'Vegan',
        selected: false
      },
      meat: {
        name: 'Meat',
        selected: false
      },
      paleo: {
        name: 'Paleo',
        selected: false
      }
    },
    gender: {
      male: {
        name: 'Male',
        selected: false
      },
      female: {
        name: 'Female',
        selected: false
      }
    },
    dob: ''
  }
})

export default state

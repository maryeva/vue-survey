import Personalise from './views/Personalise.vue'
import Build from './connectors/Build.vue'
import AdditionalTests from './components/AdditionalTests.vue'
import IntroductionCard from './components/IntroductionCard.vue'
import Loader from './components/Loader.vue'
import ProfileCard from './components/ProfileCard.vue'
import PersonaliseHeading from './components/PersonaliseHeading.vue'
import PersonaliseHero from './components/PersonaliseHero.vue'
import Recommendations from './components/Recommendations.vue'
import SubscriptionCard from './components/SubscriptionCard.vue'

export default {
  domain: 'Personalise',
  views: {
    Personalise
  },
  connectors: {
    Build
  },
  components: {
    AdditionalTests,
    IntroductionCard,
    Loader,
    ProfileCard,
    PersonaliseHeading,
    PersonaliseHero,
    Recommendations,
    SubscriptionCard
  }
}

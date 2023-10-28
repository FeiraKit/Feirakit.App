import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Onboarding1 } from '../screens/OnboardingScreens/Onboarding1'
import { Onboarding2 } from '../screens/OnboardingScreens/Onboarding2'
import { Onboarding3 } from '../screens/OnboardingScreens/Onboarding3'
import { Onboarding4 } from '../screens/OnboardingScreens/Onboarding4'

const { Navigator, Screen } = createNativeStackNavigator()

export function OnboardingRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Screen
        name='Onboarding1'
        component={Onboarding1}
      />
      <Screen
        name='Onboarding2'
        component={Onboarding2}
      />
      <Screen
        name='Onboarding3'
        component={Onboarding3}
      />
      <Screen
        name='Onboarding4'
        component={Onboarding4}
      />
    </Navigator>
  )
}

import React from 'react'
import { ThemeProvider } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AuthProvider from './src/navigation/AuthProvider'
import theme from './src/styles/theme'
import Routes from './src/navigation/Routes'

import Onboarding from './src/screens/Client/CreateProfileStack/OnboardingScreen/index'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from './src/screens/AuthStack/LoginScreen/index'
import Test from './src/Test'
import CreateProfile1 from './src/screens/Client/CreateProfileStack/CreateProfile1/index'

import { createStackNavigator } from '@react-navigation/stack'
import SearchStack from './src/navigation/Client/SearchStack'
import ChatStack from './src/navigation/Client/ChatStack'

const Stack = createStackNavigator()

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme = {theme}>
        <AuthProvider>
          <Routes/>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>

  )
}

export default App
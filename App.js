import React from 'react'
import { ThemeProvider } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AuthProvider from './src/navigation/AuthProvider'
import theme from './src/styles/theme'
import Routes from './src/navigation/Routes'

import Onboarding from './src/screens/Client/CreateProfileStack/OnboardingScreen/index'

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme = {theme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>

  )
}

export default App

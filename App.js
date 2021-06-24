import React from 'react'
import AuthProvider from './src/navigation/AuthProvider'
import Routes from './src/navigation/Routes'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'react-native-elements'
import theme from './src/styles/theme'
import { NavigationContainer } from '@react-navigation/native'
import Loading from './src/screens/Client/SearchStack/LoadingScreen/index'

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

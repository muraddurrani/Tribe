import React from 'react'
import AuthProvider from './src/navigation/AuthProvider'
import Routes from './src/navigation/Routes'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'react-native-elements'
import CreateProfile0 from './src/screens/Provider/CPProfileStack/CreateProfile0/index'
import Test from './src/Test'
import theme from './src/styles/theme'

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

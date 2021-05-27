import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'react-native-elements'

import theme from './src/styles/theme'

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme = {theme}>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App

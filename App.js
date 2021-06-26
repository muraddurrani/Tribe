import React from 'react'
import AuthProvider from './src/navigation/AuthProvider'
import Routes from './src/navigation/Routes'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'react-native-elements'
import theme from './src/styles/theme'
import { NavigationContainer } from '@react-navigation/native'
import Loading from './src/screens/Client/SearchStack/LoadingScreen/index'

import Search0 from './src/screens/Client/SearchStack/Search1/index'
import ClientProfile1 from './src/screens/Client/CCProfileStack/CreateProfile0/index'
import ClientProfileScreen from './src/screens/Client/ProfileStack/ProfileScreen/index'
import EditProfile from './src/screens/Client/ProfileStack/EditProfileScreen/index'

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

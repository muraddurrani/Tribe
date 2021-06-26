import React from 'react'
import { Text, View } from 'react-native'
import ScreenView from './components/views/KeyboardScreenView'
import Button from './components/buttons/SecondaryButton'
import Tertiary from './components/atoms/TertiaryButton'

import theme from './styles/theme'

function Test() {
  return (
    <View>
      <Button title = "Hi"/>
      <Tertiary title = "Hi"/>
    </View>
  )
}

export default Test

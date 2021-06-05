import React from 'react'
import { View } from 'react-native'
import { Text, Input } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import KeyboardView from './components/atoms/KeyboardView'
import ScreenView from './components/atoms/ScreenView'
import PrimaryButton from './components/atoms/PrimaryButton'
import SecondaryButton from './components/atoms/SecondaryButton'
import TertiaryButton from './components/atoms/TertiaryButton'

function Test() {
  return (
    <KeyboardView contentContainerStyle = {{justifyContent: 'center'}}>
      <View>
        <Text h1>Heading 1</Text>
        <Text h2>Heading 2</Text>
        <Text h3>Heading 3</Text>
        <Text h4>Heading 4</Text>
        <Text>Occupational therapy</Text>
        <PrimaryButton title = "Primary Button" />
        <SecondaryButton title = "Secondary Button" />
        <TertiaryButton title = "Tertiary Button" />
        <Input />
        <Input />
        <Input />
        <Input />
        </View>
    </KeyboardView>
  )
}

export default Test

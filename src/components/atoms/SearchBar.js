import React, { useState } from 'react'
import { Keyboard } from 'react-native'
import { Input, Icon } from 'react-native-elements'

function SearchBar(props) {

  const [value, setValue] = useState(props.value)

  return (
    <Input
      value = {value}
      onChangeText = {props.onChangeText}
      placeholder = "Search..."
      leftIcon = {<Icon name = 'search'/>}
      rightIcon = {<Icon name = 'x' onPress = {() => {
        Keyboard.dismiss()
        setValue('')
      }}/>}
    />
  )
}

export default SearchBar

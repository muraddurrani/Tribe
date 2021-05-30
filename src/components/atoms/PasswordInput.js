import React from 'react'
import { Input, Icon } from 'react-native-elements'

function PasswordInput(props) {
  return (
    <Input placeholder = "Password" leftIcon = {<Icon name = "lock"/>} secureTextEntry = {true} onChangeText = {props.onChangeText}/>
  )
}

export default PasswordInput

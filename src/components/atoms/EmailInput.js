import React from 'react'
import { Input, Icon } from 'react-native-elements'

function EmailInput(props) {
  return (
    <Input placeholder = 'Email Address' leftIcon = {<Icon name = 'mail'/>} keyboardType = 'email-address' onChangeText = {props.onChangeText}/>
  )
}

export default EmailInput

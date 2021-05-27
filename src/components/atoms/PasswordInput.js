import React from 'react'
import { Input, Icon } from 'react-native-elements'

function PasswordInput() {
  return (
    <Input placeholder = "Password" leftIcon = {<Icon name = "lock"/>}/>
  )
}

export default PasswordInput

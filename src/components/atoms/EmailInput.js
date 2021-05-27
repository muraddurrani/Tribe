import React from 'react'
import { Input, Icon } from 'react-native-elements'

function EmailInput() {
  return (
    <Input placeholder = 'Email Address' leftIcon = {<Icon name = 'mail'/>}/>
  )
}

export default EmailInput

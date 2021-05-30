import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'

function TouchableText(props) {
  return (
    <TouchableOpacity style = {props.style} onPress = {props.onPress}>
      <Text style = {props.textStyle}> {props.text} </Text>
    </TouchableOpacity>
  )
}

export default TouchableText

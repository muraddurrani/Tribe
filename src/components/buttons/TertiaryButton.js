import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'

function TertiaryButton({title, style, titleStyle, ...props}) {
  return (
    <TouchableOpacity {...props} style = {style}>
      <Text h4Style = {{...titleStyle}} h4>{title}</Text>
    </TouchableOpacity>
  )
}

export default TertiaryButton

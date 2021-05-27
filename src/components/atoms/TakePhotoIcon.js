import React from 'react'
import { Avatar } from 'react-native-elements'
import colors from '../../styles/constants/colors'

function TakePhotoIcon(props) {
  return (
    <Avatar.Accessory
      style = {{backgroundColor: colors.primary}}
      type = 'feather'
      name = 'camera'
      color = 'white'
      size = {50}
      onPress = {props.onPress}
    />
  )
}

export default TakePhotoIcon

import React from 'react'
import { StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import colours from '../../styles/colours'

function ProfileIcon({photo, style, size}) {
  return (
    photo
      ? (
        <Avatar
          rounded
          source = {{uri: photo}}
          size = {size}
          containerStyle = {{...style}}
        />
      )
      : (
        <Avatar
          rounded
          size = {size}
          containerStyle = {{...styles.avatar, ...style}}
          icon = {{name: 'user', type: 'entypo', color: colours.gray5}}
        />
      )
  )
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colours.gray2
  }
})

export default ProfileIcon

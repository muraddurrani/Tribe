import React from 'react'
import { StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import colours from '../../styles/colours'

function ProfilePicture({photo, style}) {
  return (
      photo
        ? (
          <Avatar
            rounded
            containerStyle = {{...styles.avatar, ...style}}
            source = {{uri: photo}}
            size = {32}
          />
        )
        : (
          <Avatar
            rounded
            containerStyle = {{...styles.avatar, ...style}}
            icon = {{name: 'user', color: colours.gray4, type: 'entypo'}}
            size = {32}    
          />
        )
  )
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colours.gray2,
    alignSelf: 'center'
  },

})

export default ProfilePicture

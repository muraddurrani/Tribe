import React from 'react'
import { StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import colours from '../../styles/colours'

function ProfilePicture({photo, style}) {
  return (
      photo
        ? (
          <Avatar
            containerStyle = {{...styles.avatar, ...style}}
            source = {{uri: photo}}
            size = {200}
            imageProps = {{borderRadius: 20}}   
          />
        )
        : (
          <Avatar
            containerStyle = {{...styles.avatar, ...style}}
            icon = {{name: 'user', color: colours.gray4, type: 'entypo'}}
            size = {200}    
          />
        )
  )
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colours.gray2,
    borderRadius: 20,
    alignSelf: 'center'
  },

})

export default ProfilePicture

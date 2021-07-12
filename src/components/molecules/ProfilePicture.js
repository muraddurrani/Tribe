import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements'
import colours from '../../styles/colours'

function ProfilePicture({photo}) {
  return (
    photo
      ? (
        <Image
          style = {styles.image}
          source = {{uri: photo}}
        />
      )
      : (
        <View style = {styles.avatar}>
          <Icon name = "user" type = "entypo" size = {100} />
        </View>
      )
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250
  },
  avatar: {
    width: '100%',
    height: 250,
    backgroundColor: colours.gray2,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ProfilePicture

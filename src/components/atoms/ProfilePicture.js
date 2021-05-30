import React from 'react'
import { StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import colors from '../../styles/constants/colors'

function ProfilePicture(props) {
  return (
      <Avatar source = {props.source}>
        <Avatar.Accessory name = 'camera' type = 'feather' size = {40} style = {styles.iconContainer} onPress = {props.onPress}/>
      </Avatar>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: colors.primary,
    marginRight: 5,
    marginBottom: 5
  }
})

export default ProfilePicture

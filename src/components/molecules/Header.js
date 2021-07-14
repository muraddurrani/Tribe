import React from 'react'
import { StyleSheet } from 'react-native'
import { Icon, Text } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import ProfileIcon from './ProfileIcon'
import colours from '../../styles/colours'

function Header({title, onPress, icon, profilePhoto, rightIcon}) {
  return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors = {[colours.primary, colours.secondary]} style = {styles.container}>
      {icon && <Icon name = "chevron-left" color = {colours.gray0} size = {30} containerStyle = {styles.icon} onPress = {onPress} />}
      {profilePhoto && <ProfileIcon photo = {profilePhoto} size = {40} style = {styles.profile}/>}
      <Text h3Style = {styles.title} h3>{title}</Text>
      {rightIcon && rightIcon}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    color: colours.gray0
  },
  icon: {
    marginRight: 10
  },
  profile: {
    marginRight: 10,
  }
})

export default Header

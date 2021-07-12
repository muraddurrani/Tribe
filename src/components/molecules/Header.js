import React from 'react'
import { StyleSheet } from 'react-native'
import { Icon, Text } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import colours from '../../styles/colours'

function Header({title, onPress, icon = false}) {
  return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors = {[colours.primary, colours.secondary]} style = {styles.container}>
      {icon && <Icon name = "chevron-left" color = {colours.gray0} size = {30} containerStyle = {styles.icon} onPress = {onPress} />}
      <Text h2Style = {styles.title} h2>{title}</Text>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  title: {
    color: colours.gray0
  },
  icon: {
    marginRight: 20
  }
})

export default Header

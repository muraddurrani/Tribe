import React from 'react'
import { View, ImageBackground, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import colours from '../../styles/colours'

function Header(props) {
  return (
    <View style = {{...styles.container, ...props.style}} >
      <ImageBackground source = {require('../../assets/images/Header_Background.png')} style = {styles.background}>
      <Text h2Style = {styles.header} h2>{props.children}</Text>
    </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.primary
  },
  background: {
    width: '100%',
    height: 120,
    justifyContent: 'flex-end'
  },
  header: {
    color: colours.gray0,
    marginLeft: 20,
    marginBottom: 20
  }
})

export default Header

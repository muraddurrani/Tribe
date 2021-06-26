import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'

function Header({ title, icon }) {
  return (
    <View style = {styles.view}>
      {
        icon && (
          icon
        )
      }
      <Text h1>{title}</Text>
      <Image
        source = {require('../../assets/images/Logo_Icon_White.png')}
        style = {styles.logo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 70,
    paddingBottom: 10,
    paddingLeft: 20
  },
  logo: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 15,
    right: 20
  }
})

export default Header

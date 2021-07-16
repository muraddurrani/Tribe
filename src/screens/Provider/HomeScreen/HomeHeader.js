import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'

import colours from '../../../styles/colours'

function HomeHeader({title}) {
  return (
    <View style = {styles.container}>
      <Text h3Style = {styles.title} h3>{title}</Text>
      <Image source = {require('../../../assets/images/Logo_Icon_White.png')} style = {styles.image}/>
    </View>
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
  image: {
    height: 30,
    width: 30,
    position: 'absolute',
    right: 20
  }
})

export default HomeHeader

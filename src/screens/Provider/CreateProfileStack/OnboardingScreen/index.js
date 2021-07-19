import React, { useState } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import { Text } from 'react-native-elements'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import ScreenView from '../../../../components/views/ScreenView'
import colours from '../../../../styles/colours'

import Home from './Home'
import PendingMatch from './PendingMatch'
import Appointments from './Appointments'
import Chats from './Chats'
import Profile from './Profile'
import Next from './Next'

function index({ navigation }) {
  const [index, setIndex] = useState(0)

  const screens = [<Home />, <PendingMatch />, <Appointments />, <Chats />, <Profile />, <Next />]

  const render = ({item}) => (
    item
  )

  return (
    <ScreenView style = {styles.container}>
      <Text h1Style = {styles.header} h1>Welcome to Tribe!</Text>
      <Text h3Style = {styles.text} h3>Here is some information to get you started.</Text>
      <Carousel
        data = {screens}
        renderItem = {render}
        itemWidth = {Dimensions.get("window").width}
        sliderWidth = {Dimensions.get("window").width}
        onSnapToItem = {(index) => setIndex(index)}
      />
      <View style = {{justifyContent: 'flex-end'}}>
        <Pagination
          activeDotIndex = {index}
          dotsLength = {6}
        />
      </View>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 40
  },
  header: {
    color: colours.gray8,
    marginBottom: 10
  },
  text: {
    textAlign: 'center',
    marginBottom: 50
  }
})

export default index

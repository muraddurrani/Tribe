import React, { useState } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import colours from '../../../styles/colours'

import ClientDetails from './ClientDetails'
import ProviderDetails from './ProviderDetails'

function index({ navigation }) {
  const [index, setIndex] = useState(0)

  const details = [<ClientDetails />, <ProviderDetails />]

  const render = ({item}) => (
    item
  )

  return (
    <View style = {styles.container}>
      <Carousel
        data = {details}
        renderItem = {render}
        itemWidth = {Dimensions.get("window").width}
        sliderWidth = {Dimensions.get("window").width}
        onSnapToItem = {(index) => setIndex(index)}
      />
      <View style = {{justifyContent: 'flex-end', paddingBottoom: 20}}>
        <Pagination
          activeDotIndex = {index}
          dotsLength = {2}
        />
      </View>
      <Icon
        name = 'x'
        containerStyle = {styles.icon}
        onPress = {() => navigation.goBack()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.gray0
  },
  icon: {
    position: 'absolute',
    top: 20,
    right: 20
  }
})

export default index

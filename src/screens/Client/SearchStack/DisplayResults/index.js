import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Icon, Text } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel'
import ScreenView from '../../../../components/views/ScreenView'
import ProviderCard from './ProviderCard'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'

import colours from '../../../../styles/colours'

function index({ navigation, route }) {
  const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')
  let result = route.params

  const render = (item) => {
    if (item.index == result.length - 1) {
      return (
        <View>
          <ProviderCard data = {item.item} />
        </View>
      )
    } else {
      return (
        <View>
          <ProviderCard data = {item.item} />
          <Icon name = 'chevron-down' size = {30} containerStyle = {styles.downIcon}/>
        </View>
      )
    }
  }

  return (
    <ScreenView style = {styles.container}>
      <PrimaryButton
        title = {<Icon name = 'x' color = {colours.gray3}/>}
        containerStyle = {styles.endContainer}
        buttonStyle = {styles.endButton}
        titleStyle = {{color: colours.gray3}}
        onPress = {() => navigation.popToTop()}
      />
      {
        result.length != 0
          ? (
            <Carousel
              vertical
              data = {result}
              itemHeight = {viewportHeight}
              sliderHeight = {viewportHeight}
              renderItem = {render}
            />
          )
          : (
            <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text h3>No results found</Text>
            </View>
          )
      }
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.gray1,
    alignItems: 'center'
  },
  list: {
    width: '100%',
  },
  downIcon: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center'
  },
  endContainer: {
    width: 40,
    position: 'absolute',
    alignSelf: 'center',
    top: 15,
    right: 15,
    zIndex: 1
  },
  endButton: {
    width: 40,
    backgroundColor: 'rgba(110, 110, 110 ,0.7)'
  }
})

export default index
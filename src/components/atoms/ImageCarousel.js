import React, { useState } from 'react'
import { View, Image } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import theme from '../../styles/theme'

function ImageCarousel(props) {

  const [index, setIndex] = useState(0)

  const itemHeight = props.itemHeight
  const itemWidth = props.itemWidth
  const carouselWidth = props.carouselWidth
  const itemPadding = (carouselWidth - itemWidth) / 2

  const render = (source) => (
    <Image
      style = {{height: itemHeight, width: itemWidth}}
      source = {{uri: source.item}}
    />
  )

  return (
    <View>
      <View style = {{height: itemHeight, width: carouselWidth, alignSelf: 'center'}}>
        <Carousel
          data = {props.data}
          renderItem = {render}
          itemWidth = {itemWidth}
          sliderWidth = {carouselWidth}
          contentContainerStyle = {{padding: itemPadding}}
          onSnapToItem = {index => setIndex(index)}
        />
      </View>
      <Pagination
        activeDotIndex = {index}
        dotsLength = {props.data.length}
        containerStyle = {{paddingVertical: theme.spacing.spacing3}}
      />
    </View>
  )
}

export default ImageCarousel

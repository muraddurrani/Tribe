import React from 'react'
import LottieView from 'lottie-react-native'

import colours from '../../../../styles/colours'

function index() {
  return (
    <LottieView
    style = {{flex: 1, backgroundColor: colours.primary}}
    source = {require('../../../../assets/13187-searching-message.json')} autoPlay loop/>
  )
}

export default index

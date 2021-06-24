import React from 'react'
import { View } from 'react-native'
import colours from '../../styles/colours'

function Transition() {
  return (
    <View style = {{height: 100, width: '100%'}}>
      <View style = {{flex: 1, backgroundColor: colours.gray0}}>
        <View style = {{flex: 1, backgroundColor: colours.primary, borderBottomRightRadius: 50}} />
      </View>
      <View style = {{flex: 1, backgroundColor: colours.primary}}>
        <View style = {{flex: 1, backgroundColor: colours.gray0, borderTopLeftRadius: 50}} />
      </View>
    </View>
  )
}

export default Transition

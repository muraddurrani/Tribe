import React from 'react'
import { TouchableWithoutFeedback, View, StyleSheet, Dimensions } from 'react-native'
import { BottomSheet } from 'react-native-elements'

function BottomOptions({onPress, isVisible, children}) {
  return (
    <BottomSheet isVisible = {isVisible} >
      <TouchableWithoutFeedback onPress = {onPress}>
      <View style = {styles.touchable}>
          {children}
      </View>
      </TouchableWithoutFeedback>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  touchable: {
    height: Dimensions.get('window').height - 40,
    justifyContent: 'flex-end'
  }
})

export default BottomOptions

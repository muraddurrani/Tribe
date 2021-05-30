import React, { useState } from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import colors from '../../styles/constants/colors'

function TouchTile(props) {

const [pressed, setPressed] = useState(false)

  return (
    <TouchableHighlight
      style = {pressed ? {...styles.container, ...styles.pressed} : styles.container}
      onPress = {props.onPress}
      underlayColor = {colors.primary}
      onShowUnderlay = {() => setPressed(!pressed)}
      onHideUnderlay = {() => setPressed(!pressed)}
      >
      <Text style = {styles.title}> {props.title} </Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: colors.grey3,
    borderWidth: 1,
    borderRadius: 15,
    width: 150,
    margin: 5
  },
  pressed: {
    borderWidth: 0,
    backgroundColor: colors.primary
  },
  default: {
    backgroundColor: 'white'
  },
  title: {
    fontWeight: 'bold'
  }
})

export default TouchTile

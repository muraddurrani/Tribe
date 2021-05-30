import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import colors from '../../styles/constants/colors'

function FormButton(props) {
  return (
    <Button
      containerStyle = {{...styles.container, ...props.containerStyle}}
      type = "clear"
      title = {props.title}
      buttonStyle = {styles.button}
      titleStyle = {styles.title}
      onPress = {props.onPress}/>
  )
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: colors.grey3
  },
  title: {
    color: colors.grey3,
    fontWeight: '100'
  },
  container: {
    width: '36%'
  }
})

export default FormButton

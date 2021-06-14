import React from 'react'
import { StyleSheet, Button } from 'react-native'
import { Overlay } from 'react-native-elements'

function GenderPicker(props) {

  return (
    <Overlay overlayStyle = {styles.container}>
      <Button containerStyle = {styles.buttonContainer} title = "Male" onPress = {() => {
        props.pickGender("Male")
        props.onPress()
      }}/>
      <Button containerStyle = {styles.buttonContainer} title = "Female" onPress = {() => {
        props.pickGender("Female")
        props.onPress()
      }}/>
      <Button containerStyle = {styles.buttonContainer} title = "Others" onPress = {() => {
        props.pickGender("Others")
        props.onPress()
      }}/>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 2
  }
})

export default GenderPicker

import React from 'react'
import { StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'
import FormButton from '../../../../components/atoms/FormButton'

function GenderPicker(props) {

  return (
    <Overlay overlayStyle = {styles.container}>
      <FormButton containerStyle = {styles.buttonContainer} title = "Male" onPress = {() => {
        props.pickGender("Male")
        props.onPress()
      }}/>
      <FormButton containerStyle = {styles.buttonContainer} title = "Female" onPress = {() => {
        props.pickGender("Female")
        props.onPress()
      }}/>
      <FormButton containerStyle = {styles.buttonContainer} title = "Others" onPress = {() => {
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

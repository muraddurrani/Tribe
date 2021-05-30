import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, Button, Overlay, Icon } from 'react-native-elements'

function InfoOverlay(props) {
  return (
    <Overlay overlayStyle = {styles.container}>
      <Text h2> {props.title} </Text>
      <Text style = {styles.text}> {props.text} </Text>
      <Button containerStyle = {styles.buttonContainer} icon = {<Icon name = "check" color = "white"/>} onPress = {props.onPress} />
    </Overlay>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginTop: 20
  },
  buttonContainer: {
    marginTop: 40
  }
})

export default InfoOverlay
import React from 'react'
import { Input } from 'react-native-elements'
import { View, StyleSheet } from 'react-native'

function NameInput() {
  return (
    <View style = {styles.container}>
      <Input placeholder = "First Name" containerStyle = {styles.inputContainer}/>
      <Input placeholder = "Last Name" containerStyle = {styles.inputContainer}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  inputContainer: {
    width: '40%'
  }
})

export default NameInput

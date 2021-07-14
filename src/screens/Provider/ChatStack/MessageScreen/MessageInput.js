import React, { useState } from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import colours from '../../../../styles/colours'

function MessageInput({ onPress }) {
  const [message, setMessage] = useState('')
  return (
    <View style = {styles.container}>
      <TextInput
        style = {styles.inputContainer}
        placeholder = "Type a message..."
        multiline = {true}
        value = {message}
        onChangeText = {(text) => setMessage(text)}
      />
      <Icon
        name = "send" type = "font-awesome"
        color = {message.length == 0 ? colours.gray4 : colours.midpoint2}
        containerStyle = {styles.sendIcon}
        disabled = {message.length == 0}
        disabledStyle = {styles.disabledIcon}
        onPress = {() => {
          onPress(message)
          setMessage('')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colours.gray0,
    borderTopColor: colours.gray2,
    borderTopWidth: 1,
    padding: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: 280,
    backgroundColor: colours.gray1,
    borderRadius: 20,
    borderColor: colours.gray2,
    borderWidth: 1,
    paddingHorizontal: 20
  },
  sendIcon: {
    marginLeft: 30
  },
  disabledIcon: {
    backgroundColor: 'transparent'
  }
})

export default MessageInput

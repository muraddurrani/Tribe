import React, { useContext } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { Text } from 'react-native-elements'
import { AuthContext } from '../../../../navigation/AuthProvider'

import ScreenView from '../../../../components/views/ScreenView'
import colours from '../../../../styles/colours'

function MessageView({messages}) {
  const { user } = useContext(AuthContext)

  const render = (message) => {
    const sent = message.item.userID == user.uid
    const timeSent = message.item.createdAt
    const days = (new Date() - timeSent) / (1000 * 60 * 60 * 24)
    let timeMsg = ''

    if (days < 1) {
      timeMsg = timeSent.toLocaleString().substring(10, 16)
    } else if (days < 7) {
      timeMsg = timeSent.toLocaleString().substring(0, 3)
    } else {
      timeMsg = timeSent.toLocaleString().substring(4, 10)
    }

    return (
      <View style = {sent ? styles.sentView : styles.receivedView}>
        <View style = {sent ? styles.sentBubble : styles.receivedBubble}>
          <Text style = {sent ? styles.sentText : styles.receivedText}>{message.item.text}</Text>
          <View style = {styles.timestamp}>
            <Text style = {sent ? styles.sentText : styles.receivedText}>{timeMsg}</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
      <ScreenView style = {styles.container}>
        {messages.length == 0
          ? <Text style = {styles.placeholder}>Send a message!</Text>
          : <FlatList
              contentContainerStyle = {styles.list}
              data = {messages}
              renderItem = {render}
              keyExtractor = {(item, index) => index}
              inverted
              showsVerticalScrollIndicator = {false}
            />
        }
      </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    justifyContent: 'flex-end'
  },
  placeholder: {
    marginBottom: 40,
    alignSelf: 'center'
  },
  list: {
    paddingVertical: 10
  },
  sentView: {
    alignSelf: 'flex-end',
    width: '80%'
  },
  sentBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colours.midpoint1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginTop: 5
  },
  sentText: {
    color: colours.gray0
  },
  receivedView: {
    alignSelf: 'flex-start',
    width: '80%',
  },
  receivedBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colours.gray0,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginTop: 5
  },
  receivedText: {
    color: colours.gray6
  },
  timestamp: {
    alignSelf: 'flex-end',
    marginTop: 5
  }
})

export default MessageView

import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Avatar, ListItem, Text } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import ScreenView from '../../../../components/atoms/ScreenView'
import theme from '../../../../styles/theme'

function index({ navigation }) {

  const [matches, setMatches] = useState()

  fetchData = async () => {
    const docs = await firestore().collection('Providers').doc(auth().currentUser.uid).collection('PendingMatches').orderBy('timestamp', 'desc').get()
    return docs
  }
  
  useEffect(() => {
    fetchData().then((snapshot) => {
      setMatches(snapshot.docs.map(doc => {
        return {id: doc.id, data: doc.data()}
      }))
    })
  }, [])

  const render = ({item}) => {
    const id = item.id
    const data = item.data
    return (
      <ListItem
        bottomDivider
        onPress = {() => navigation.navigate('MatchDetails', {id, data})}
        >
        {
          data.image
            ? <Avatar rounded source = {{uri: data.image}}/>
            : <Avatar rounded containerStyle = {styles.avatar} icon = {{name: 'user', color: theme.colours.gray5, type: 'feather', size: 24}}/>
        }
        <ListItem.Content>
          <ListItem.Title>{data.childName}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron size = {24} />
      </ListItem>
    )
  }

  return (
    <ScreenView style = {styles.container}>
      <Text h2Style = {styles.header} h2>Pending Matches</Text>
      <FlatList
        data = {matches}
        renderItem = {render}
        keyExtractor = {(item, index) => index}
      />
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.spacing3
  },
  header: {
    marginBottom: 20
  },
  avatar: {
    backgroundColor: theme.colours.gray2
  }
})

export default index

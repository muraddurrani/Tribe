import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import ScreenView from '../../../../components/views/ScreenView'
import Header from '../../../../components/molecules/Header'
import MatchItem from './MatchItem'

function index({navigation}) {
  const [data, setData] = useState([])

  useEffect(() => {
    firestore().collection('Clients').doc(auth().currentUser.uid).collection('Matches').orderBy('attributes.0', 'asc').
      onSnapshot(snapshot => {
        setData(snapshot.docs.map(doc => doc.data()))
      })
  }, [])

  const header = <Text h3Style = {{marginBottom: 10}} h3>Create appointment with</Text>

  const render = ({item}) => (
    <MatchItem item = {item} />
  )

  return (
    <ScreenView style = {styles.container}>
      <Header icon title = "Create Appointment" onPress = {() => navigation.goBack()} />
      {
        data.length != 0
          ? (
            <View style = {styles.listContainer}>
              <FlatList
                style = {styles.list}
                data = {data}
                renderItem = {render}
                keyExtractor = {(item, index) => index}
                ListHeaderComponent = {header}
              />
            </View>
          )
          : (
              <Text h3Style = {styles.placeholder} h3>You don't have any matches yet!</Text>
          )
      }
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  listContainer: {
    width: '90%',
    height: '70%',
    marginVertical: 30
  },
  placeholder: {
    marginTop: '50%',
    paddingHorizontal: 20,
    textAlign: 'center'
  }
})

export default index

import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Avatar, Button, Text, Divider } from 'react-native-elements'
import { AuthContext } from '../../../navigation/AuthProvider'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import _ from 'lodash'
import colors from '../../../styles/constants/colors'

function ProfileScreen() {

  const { logout } = useContext(AuthContext)
  const [data, setData] = useState()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    firestore().collection("Clients").doc(auth().currentUser.uid).get()
      .then((doc) => {
        if (doc.exists) {
          setData(doc.data())}
        })
  }

  function getAge() {
    if (data) {
      const now = new Date()
      const dob = new Date(data.dob.seconds * 1000)
      return Math.floor((now - dob) / (1000 * 60 * 60 * 24 * 365))
    }
  }

  function getName() {
    if (data) {
      return data.childFirstName + " " + data.childLastName
    }
  }
  function getServices() {
    if (data) {
      return data.services
    }
  }

  const render = ({item}) => (
    <Text style = {styles.text}>{item}</Text>
  )

  return (
    <View style = {styles.container}>
      <Text style = {styles.header} h2>Your Profile</Text>
      <Avatar
        containerStyle = {{alignSelf: 'center'}}
        source = {{uri: _.has(data, 'profilePicture') ? data.profilePicture : 'placeholder.jpg'}}
      />
      <Text style = {styles.name} h4>{getName()}</Text>
      <Text>{getAge()} years old</Text>
      <Divider style = {{margin: 20}}/>
      <Text style = {styles.sectionHeader}>{'Interested In'}</Text>
      <View>
        <FlatList
          data = {getServices()}
          renderItem = {render}
          keyExtractor = {item => item}
        />
      </View>
      <Divider style = {{margin: 20}}/>
      <Button containerStyle = {styles.button} title = "Log Out" onPress = {() => logout()}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fcfcfc',
    flex: 1,
    paddingLeft: 20
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
  },
  name: {
    marginTop: 10,
    color: colors.primary
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  text: {
    marginBottom: 2
  },
  button: {
    marginTop: 15,
    alignSelf: 'center'
  }
})

export default ProfileScreen

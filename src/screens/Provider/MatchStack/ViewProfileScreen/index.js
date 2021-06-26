import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from 'react-native-elements'
import { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import { AuthContext } from '../../../../navigation/AuthProvider'
import { getAge, mapArrayToSentence } from '../../../../utilities/helper'
import GradientScreenView from '../../../../components/views/GradientScreenView'
import Header from '../../../../components/molecules/Header'
import ProfilePicture from '../../../../components/molecules/ProfilePicture'
import colours from '../../../../styles/colours'
import Section from '../../../../components/molecules/Section'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import SecondaryButton from '../../../../components/buttons/SecondaryButton'

function index({ navigation, route }) {

  const data = route.params
  const [age, setAge] = useState()
  const [loading, setLoading] = useState(false)
  const { user, userData } = useContext(AuthContext)

  const dismissMatch = async () => {
    await firestore().collection('Providers').doc(user.uid).collection('PendingMatches').doc(data.clientID).delete()
    navigation.goBack()
  }

  const confirmMatch = async () => {
    setLoading(true)
    const ref = firestore().collection('Chat').doc().collection('Messages')

    const providerRef = firestore().collection('Providers').doc(user.uid).collection('Messages').doc(data.clientID)

    await providerRef.set({
      messageReference: ref.path,
      clientID: data.clientID,
      parentFullName: data.parentFullName,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp() 
    })

    if (data.profilePhoto) {
      await providerRef.update({clientProfile: data.profilePhoto})
    }

    const clientRef = firestore().collection('Clients').doc(data.clientID).collection('Messages').doc(user.uid)

    await clientRef.set({
      messageReference: ref.path,
      providerID: user.uid,
      fullName: userData.fullName,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp() 
    })

    if (userData.profilePhoto) {
      await clientRef.update({providerProfile: userData.profilePhoto})
    }

    await firestore().collection('Providers').doc(user.uid).collection('PendingMatches').doc(data.clientID).delete()

    navigation.navigate('Messaging')
  }

  useEffect(() => {
    setAge(getAge(data.childDOB.seconds))
  }, [])

  return (
    <GradientScreenView>
      <Header title = {data.parentFullName}
        icon = {<Icon name = "arrow-left" color = {colours.gray0} size = {30} containerStyle = {{marginRight: 15}} onPress = {() => navigation.goBack()}/>}
      />
      <View style = {styles.card}>
        <ProfilePicture photo = {data.profilePhoto} style = {styles.profile}/>
        <Text h4Style = {styles.name} h4>{data.childFullName}</Text>
        <Text>{age} years old</Text>
        {data.childGender.length != 0 && <Text>{data.childGender}</Text>}
        <Section title = "Details">
          <Text>{mapArrayToSentence(data.attributes[1])}</Text>
          <Text>{mapArrayToSentence(data.attributes[2])}</Text>
          <Text>{mapArrayToSentence(data.attributes[3])}</Text>
          <Text>{mapArrayToSentence(data.attributes[4])}</Text>
          <Text>{data.frequency[0]}</Text>
        </Section>
        <View style = {styles.rowView}>
          <SecondaryButton title = "Dismiss" containerStyle = {styles.button} onPress = {() => dismissMatch()} />
          <PrimaryButton title = "Match" containerStyle = {styles.button} loading = {loading} onPress = {() => confirmMatch()}/>
        </View>
      </View>
    </GradientScreenView>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colours.gray0,
    borderTopLeftRadius: 30,
    paddingHorizontal: 30
  },
  profile: {
    marginVertical: 20
  },
  name: {
    marginBottom: 5
  },
  rowView: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 20
  }
})

export default index

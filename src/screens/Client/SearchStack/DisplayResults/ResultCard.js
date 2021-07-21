import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Text, Icon } from 'react-native-elements'
import { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import { AuthContext } from '../../../../navigation/AuthProvider'
import Card from '../../../../components/atoms/Card'
import ProfilePicture from '../../../../components/molecules/ProfilePicture'
import Section from '../../../../components/molecules/Section'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'

import { mapArrayToSentence } from '../../../../utilities/helper'

function ResultCard({id, attributes, frequency}) {

  const [data, setData] = useState({})
  const [expand, setExpand] = useState(false)
  const [matched, setMatched] = useState(false)
  const { user, userData } = useContext(AuthContext)

  const submitMatch = () => {
    const ref = firestore().collection('Providers').doc(id).collection('PendingMatches').doc(user.uid)
    ref.set({
      attributes,
      frequency,
      clientID: user.uid,
      childFullName: userData.childFullName,
      parentFullName: userData.parentFullName,
      childDOB: userData.childDOB,
      childGender: userData.childGender,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    if (userData.profilePhoto) {
      ref.update({profilePhoto : userData.profilePhoto})
    }
  }

  useEffect(() => {
    firestore().collection('Providers').doc(id).get().
      then(doc => setData(doc.data()))
  }, [])

  return (
    <Card style = {styles.card}>
      <ProfilePicture photo = {data.profilePhoto} style = {styles.profile}/>
      <Text h4Style = {styles.name} h4>{data.fullName}</Text>
      <Text>{data.serviceDescription}</Text>
      {
        expand
          ? (<Section title = "Details">
              <Text style = {styles.text}>{mapArrayToSentence(attributes[1])}</Text>
              <Text style = {styles.text}>{mapArrayToSentence(attributes[2])}</Text>
              <Text style = {styles.text}>{mapArrayToSentence(attributes[3])}</Text>
              <Text style = {styles.text}>{mapArrayToSentence(attributes[4])}</Text>
              <PrimaryButton
                title = {matched ? <Icon name = 'check'/> : 'Match'}
                disabled = {matched}
                containerStyle = {styles.button}
                onPress = {() => {
                  setMatched(true)
                  submitMatch()
                }}
              />
            </Section>)
          : (<Icon name = "chevron-down" onPress = {() => setExpand(!expand)} containerStyle = {styles.icon}/>)
      }
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    padding: 20,
    marginBottom: 30
  },
  profile: {
    marginBottom: 15
  },
  name: {
    marginBottom: 5
  },
  icon: {
    width: 24,
    alignSelf: 'center'
  },
  text: {
    marginBottom: 3
  },
  button: {
    marginTop: 10,
    alignSelf: 'center'
  }
})

export default ResultCard
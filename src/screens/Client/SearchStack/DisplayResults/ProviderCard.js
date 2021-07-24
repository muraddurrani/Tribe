import React, {useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Text, Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import { mapObjectToSentence } from '../../../../utilities/helper'
import ProfilePicture from '../../../../components/molecules/ProfilePicture'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import colours from '../../../../styles/colours'

function ProviderCard({ data }) {
  const [name, setName] = useState('')
  const [photo, setPhoto] = useState('')
  const [description, setDescription] = useState('')
  const [matched, setMatched] = useState(false)
  const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

  const submitMatch = () => {
    setMatched(true)
    firestore().collection('Providers').doc(data.ID).collection('PendingMatches').doc(auth().currentUser.uid).set({
      ID: auth().currentUser.uid,
      attributes: data.attributes,
      frequency: data.frequency,
      createdAt: new Date()
    })
  }

  useEffect(() => {
    firestore().collection('Providers').doc(data.ID).get().
      then(doc => {
        setName(doc.data().fullName)
        setPhoto(doc.data().profilePhoto)
        setDescription(doc.data().serviceDescription)
      })
  })

  return (
    <View style = {{width: viewportWidth, height: viewportHeight, backgroundColor: colours.gray1}}>
      <ProfilePicture photo = {photo} />
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors = {[colours.primary, colours.secondary]} style = {styles.featureView}>
      <Text h4Style = {styles.featureHeader} h4>{name}</Text>
      </LinearGradient>
      <View style = {styles.body}>
        <View style = {styles.tile}>
          <Text style = {styles.bodyHeader}>Description</Text>
          <Text style = {styles.bodyText}>{description}</Text>
        </View>
        <View style = {styles.tile}>
          <Text style = {styles.bodyHeader}>Details</Text>
          {Object.values(data.attributes).map((value, index) => (
            <Text style = {styles.bodyText} key = {index}>{mapObjectToSentence(value)}</Text>
          ))}
          <Text>{data.frequency}</Text>
        </View>
      </View>
      <PrimaryButton
        title = {matched ? <Icon name = 'check' color = {colours.gray1}/> : 'Match'}
        disabled = {matched}
        containerStyle = {styles.buttonContainer}
        onPress = {() => submitMatch()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  featureView: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 280,
    borderRadius: 5,
    position: 'absolute',
    alignSelf: 'center',
    top: 225
  },
  featureHeader: {
    fontSize: 16,
    color: colours.gray0,
    marginBottom: 5
  },
  body: {
    marginTop: 10,
    paddingHorizontal: '3%',
    paddingTop: 20
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  featureText: {
    color: colours.gray0
  },
  featureIcon: {
    marginRight: 10
  },
  tile: {
    backgroundColor: colours.gray0,
    elevation: 3,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10
  },
  icon: {
    marginHorizontal: 40
  },
  bodyHeader: {
    fontSize: 16,
    marginBottom: 5,
    color: colours.gray5
  },
  bodyText: {
    marginBottom: 5
  },
  buttonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 20
  }
})

export default ProviderCard

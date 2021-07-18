import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import { mapObjectToSentence } from '../../../../utilities/helper'
import ScrollScreenView from '../../../../components/views/ScrollScreenView'
import ProfilePicture from '../../../../components/molecules/ProfilePicture'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import SecondaryButton from '../../../../components/buttons/SecondaryButton'
import colours from '../../../../styles/colours'

function index({ navigation, route }) {
  const {ID, age, data, attributes, frequency} = route.params
  const [dismiss, setDismiss] = useState(false)
  const [match, setMatch] = useState(false)

  const removeFromPending = async () => {
    firestore().collection('Providers').doc(auth().currentUser.uid).collection('PendingMatches').doc(ID).delete()
  }

  const confirmMatch = async () => {
    setMatch(true)
    const provID = auth().currentUser.uid
    const msgRef = firestore().collection('Chats').doc().collection('Messages')

    await firestore().collection('Providers').doc(provID).collection('Chats').doc(ID).set({
      ID: ID,
      lastUpdated: new Date(),
      msgRef: msgRef.path,
      read: false
    })

    await firestore().collection('Clients').doc(ID).collection('Chats').doc(provID).set({
      ID: provID,
      lastUpdated: new Date(),
      msgRef: msgRef.path,
      read: false
    })

    await firestore().collection('Providers').doc(provID).collection('Matches').doc(ID).set({
      ID: ID,
      attributes: attributes
    })

    await firestore().collection('Clients').doc(ID).collection('Matches').doc(provID).set({
      ID: provID,
      attributes: attributes,
      seen: false
    })

    await removeFromPending()

    navigation.goBack()
  }

  const dismissMatch = async () => {
    setDismiss(true)
    await removeFromPending()
    navigation.goBack()
  }

  return (
    <ScrollScreenView>
      <ProfilePicture photo = {data.profilePhoto}/>
      <Icon name = 'chevron-left' color = {colours.gray0} containerStyle = {styles.backButton} onPress = {() => navigation.goBack()} />
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors = {[colours.primary, colours.secondary]} style = {styles.featureView}>
        <Text h4Style = {styles.featureHeader} h4>{data.childFullName}</Text>
        <View style = {styles.rowView}>
          <Icon name = "birthday-cake" type = "font-awesome" size = {16} color = {colours.gray0} containerStyle = {styles.featureIcon}/>
          <Text style = {styles.featureText}>{age} years old</Text>
        </View>
        <View style = {styles.rowView}>
          <Icon name = "transgender" type = "font-awesome" size = {16} color = {colours.gray0} containerStyle = {styles.featureIcon}/>
          {data.childGender.length !=0 && <Text style = {styles.featureText}>{data.childGender}</Text>}
        </View>
      </LinearGradient>
      
      <View style = {styles.body}>
        <View style = {styles.tile}>
          <Icon name = "file-text" color = {colours.gray7} size = {30} containerStyle = {styles.icon}/>
          <View>
            <Text style = {styles.bodyHeader}>Details</Text>
            <View style = {styles.rowView}>
              <View style = {styles.labelView}>
                <Text h4>Parent</Text>
                <Text h4>Location</Text>
              </View>
              <View>
                <Text>{data.parentFullName}</Text>
                <Text>{data.location}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style = {styles.tile}>
          <Icon name = "search" color = {colours.gray7} size = {30} containerStyle = {styles.icon}/>
          <View>
            <Text style = {styles.bodyHeader}>Looking for</Text>
            {Object.values(attributes).map((value, index) => (
              <Text style = {styles.bodyText} key = {index}>{mapObjectToSentence(value)}</Text>
            ))}
            <Text style = {styles.bodyText}>{frequency}</Text>
          </View>
        </View>

        <View style = {{...styles.rowView, alignSelf: 'center', marginTop: 20}}>
        <SecondaryButton
          title = "Dismiss"
          containerStyle = {styles.button}
          loading = {dismiss}
          onPress = {() => dismissMatch()}
        />
        <PrimaryButton
          title = "Match"
          containerStyle = {styles.button}
          loading = {match}
          onPress = {() => confirmMatch()}
        />
      </View>
      </View>
    </ScrollScreenView>
  )
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    borderRadius: 14,
    padding: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  featureView: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 280,
    borderRadius: 5,
    position: 'absolute',
    alignSelf: 'center',
    top: 215
  },
  featureHeader: {
    fontSize: 16,
    color: colours.gray0,
    marginBottom: 5
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
  body: {
    marginTop: 70,
    paddingHorizontal: '5%',
    paddingBottom: 30
  },
  tile: {
    backgroundColor: colours.gray0,
    elevation: 3,
    borderRadius: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  icon: {
    marginHorizontal: 40
  },
  bodyHeader: {
    fontSize: 16,
    marginBottom: 5
  },
  bodyText: {
    width: 230,
    marginBottom: 5
  },
  labelView: {
    width: 80,
  },
  button: {
    marginHorizontal: 20
  }
})

export default index

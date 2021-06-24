import React, { useContext, useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'

import { AuthContext } from '../../../../navigation/AuthProvider'
import GradientScreenView from '../../../../components/views/GradientScreenView'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import ProfilePicture from '../../../../components/molecules/ProfilePicture'
import Header from '../../../../components/molecules/Header'
import Section from '../../../../components/molecules/Section'

import { mapObjectToSentence } from '../../../../utilities/helper'
import colours from '../../../../styles/colours'

function index() {

  const { userData, logout } = useContext(AuthContext)
  const [serviceInfo, setServiceInfo] = useState({})
  const [availabilityInfo, setAvailabilityInfo] = useState({})

  useEffect(() => {
    setServiceInfo({'0': userData.Responses[0], '1': userData.Responses[1], '5': userData.Responses[5]})
    setAvailabilityInfo({'2': userData.Responses[2], '3': userData.Responses[3], '4': userData.Responses[4]})
  }, [])
  
  return (
    <ScrollView>
      <GradientScreenView>
        <Header title = "My Profile"/>
        <View style = {styles.card}>
          <ProfilePicture photo = {userData.profilePhoto} style = {styles.profile}/>
          <Text h4Style = {styles.name} h4>{userData.fullName}</Text>
          <Text>{userData.serviceDescription}</Text>
          <Section title = "My Service">
            {Object.values(serviceInfo).map((value, index) => (
              <Text style = {styles.text} key = {index}>{mapObjectToSentence(value)}</Text>
            ))}
          </Section>
          <Section title = "My Availability">
            {Object.values(availabilityInfo).map((value, index) => (
              <Text style = {styles.text} key = {index}>{mapObjectToSentence(value)}</Text>
            ))}
          </Section>
          <Section title = "My Particulars">
            <Text style = {styles.text}>Email: {userData.email}</Text>
            <Text style = {styles.text}>Mobile number: {userData.phoneNumber}</Text>
          </Section>
          <PrimaryButton
            title = "Log Out"
            containerStyle = {styles.logoutButton}
            buttonStyle = {styles.logoutButton}
            onPress = {() => logout()}
          />
        </View>
      </GradientScreenView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colours.gray0,
    borderTopLeftRadius: 30,
    paddingHorizontal: 25
  },
  profile: {
    marginVertical: 20
  },
  name: {
    marginBottom: 10
  },
  text: {
    marginBottom: 5
  },
  logoutButton: {
    marginTop: 30,
    marginBottom: 20,
    alignSelf: 'center'
  }
})

export default index

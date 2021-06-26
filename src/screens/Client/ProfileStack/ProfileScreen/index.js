import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'

import { AuthContext } from '../../../../navigation/AuthProvider'
import GradientScreenView from '../../../../components/views/GradientScreenView'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import ProfilePicture from '../../../../components/molecules/ProfilePicture'
import Header from '../../../../components/molecules/Header'
import Section from '../../../../components/molecules/Section'

import { getAge } from '../../../../utilities/helper'
import colours from '../../../../styles/colours'


function index() {

  const { userData, logout } = useContext(AuthContext)
  const [age, setAge] = useState()

  useEffect(() => {
    setAge(getAge(userData.childDOB.seconds))
  }, [])

  return (
    <GradientScreenView style = {styles.container}>
      <Header title = "My Profile"/>
      <View style = {styles.card}>
        <ProfilePicture photo = {userData.profilePhoto} style = {styles.profile}/>
        <Text h4Style = {styles.name} h4>{userData.childFullName}</Text>
        <Text>{age} years old</Text>
        {userData.childGender.length != 0 && <Text>{userData.childGender}</Text>}
        <Section title = "My Particulars">
          <Text style = {styles.text}>{userData.parentFullName}</Text>
          <Text>Location: {userData.location}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Mobile number: {userData.phoneNumber}</Text>
        </Section>
        <View style={styles.rowView}>
          <PrimaryButton
            title = "Edit Profile"
            onPress = {() => {
              navigation.navigate('EditProfileScreen')
            }}
            containerStyle = {styles.logoutButtonContainer}
            buttonStyle = {styles.logoutButton}
          />
          <PrimaryButton
            title = "Log Out"
            containerStyle = {styles.logoutButton}
            buttonStyle = {styles.logoutButton}
            onPress = {() => logout()}
          />
        </View>

      </View>
    </GradientScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.primary,
  },
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
    lineHeight: 18,
    marginBottom: theme.spacing.spacing1
  },
  logoutButtonContainer: {
    marginTop: theme.spacing.spacing4,
    alignSelf: 'center'
  },
  logoutButton: {
    backgroundColor: theme.colours.primary
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 5
  },
  logoutButton: {
    marginTop: 20,
    alignSelf: 'center'
  }
})

export default index

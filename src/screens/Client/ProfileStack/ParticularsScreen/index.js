import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

import NameInput from '../../../../components/atoms/NameInput'
import FormButton from '../../../../components/atoms/FormButton'
import ProfilePicture from '../../../../components/atoms/ProfilePicture'
import GenderPicker from './GenderPicker'
import DateTimePicker from '@react-native-community/datetimepicker'

function index({ navigation }) {

  const [showGender, setShowGender] = useState(false)
  const [showDOB, setShowDOB] = useState(false)
  const [gender, setGender] = useState('Gender')
  const [dob, setDOB] = useState(new Date())
  const [dobButton, setDOBButton] = useState('Date of Birth')
  const [childFirstName, setChildFirstName] = useState('')
  const [childLastName, setChildLastName] = useState('')
  const [profile, setProfile] = useState();
  const filepath = `ClientProfiles/${auth().currentUser.uid}`

  const pickGender = (value) => {
    setGender(value)
  }

  const uploadImage = async () => {
    if (profile) {
      try {
        await storage().ref().child(filepath).putFile(profile)
        storage().ref().child(filepath).getDownloadURL()
          .then(url => firestore().collection("Clients").doc(auth().currentUser.uid).update({profilePicture: url}))
      } catch (e) {
        console.log(e)
      }
      
      
    }
  }

  const handleNext = () => {
    uploadImage()
    firestore().collection('Clients').doc(auth().currentUser.uid).update({childFirstName, childLastName, gender, dob})
    navigation.navigate('ServiceCategory')
  }

  return (
    <View style = {styles.container}>
    <Text h1>Create your profile</Text>
    <Text style = {styles.text}>Please provide your child's particulars</Text>
    <NameInput onChangeFirstName = {(text) => setChildFirstName(text)} onChangeLastName = {(text) => setChildLastName(text)}/>
    <View style = {styles.buttonsContainer}>
      <FormButton containerStyle = {styles.button} container title = {gender} onPress = {() => setShowGender(true)}/>
      <FormButton containerStyle = {styles.button} title = {dobButton} onPress = {() => setShowDOB(!showDOB)}/>
    </View>
    <Text style = {styles.text}>Upload a profile photo</Text>
    <ProfilePicture 
      source = {{
        uri: profile ? profile : 'placeholder.jpg'
      }}
      onPress = {() => {
        launchImageLibrary({mediaType: 'photo'}, response => {
          if (response.assets) {
            setProfile(response.assets[0].uri)
          }
        }
        )
      }
    }/>
    <Button containerStyle = {styles.nextButton} title = "Next" onPress = {() => handleNext()}/>

    {showGender && (
      <GenderPicker onPress = {() => setShowGender(false)}
        pickGender = {pickGender} />
    )}

    {
      showDOB && (
        <DateTimePicker 
          value = {dob}
          mode = "date"
          onChange = {(event, value ) => {
          setShowDOB(!showDOB)
          const currentDate = value || dob
          setDOB(currentDate)
          setDOBButton(currentDate.toISOString().substring(0, 10))
          }}
        />
      )
    }
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: '2%'
  },
  text: {
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20
  },
  nextButton: {
    marginTop: 30
  }
})

export default index

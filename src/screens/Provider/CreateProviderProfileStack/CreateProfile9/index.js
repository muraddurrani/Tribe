import React, { useState, } from 'react'
import { Image, StyleSheet, TextInput } from 'react-native'
import { Text } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import _ from 'lodash'

import KeyboardGradientView from '../../../../components/views/KeyboardGradientView'
import Card from '../../../../components/atoms/Card'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'

import colours from '../../../../styles/colours'

function index({ navigation }) {

  const [description, setDescription] = useState('')

  const submit = () => {
    firestore().collection('Providers').doc(auth().currentUser.uid).update({serviceDescription: description})
    firestore().collection('Users').doc(auth().currentUser.uid).update({profileComplete: true})
    navigation.navigate('CP10')
  }
  return (
    <KeyboardGradientView style = {styles.container}>
      <Image source = {require('../../../../assets/images/Logo_Icon_White.png')} style = {styles.image} />
      <Text h1Style = {styles.header} h1>Create your profile</Text>
      <Card style = {styles.card}>
        <Text h4>Tell us a bit about your service.</Text>
        <Text>(200 characters maximum)</Text>
        <TextInput
          placeholder = "Tell us a bit about your service..."
          style = {styles.input}
          textAlignVertical = 'top'
          multiline = {true}
          numberOfLines = {6}
          maxLength = {200}
          value = {description}
          onChangeText = {(text) => setDescription(text)}
        />
        <PrimaryButton
          title = "Next"
          disabled = {description.length === 0}
          containerStyle = {styles.button}
          onPress = {() => submit()}
        />
      </Card>
    </KeyboardGradientView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  image: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 15,
    right: 20
  },
  header: {
    marginTop: '20%'
  },
  card: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 15,
    marginTop: 10,
    width: '95%',
    alignItems: 'center'
  },
  input: {
    marginTop: 20,
    padding: 15,
    borderRadius: 20,
    width: '95%',
    height: 200,
    borderWidth: 1,
    borderColor: colours.gray2,
    backgroundColor: colours.gray1
  },
  button: {
    marginTop: 30
  }
})

export default index

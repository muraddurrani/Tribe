import React, { useState, } from 'react'
import { Image, StyleSheet, TextInput, View } from 'react-native'
import { Text } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import _ from 'lodash'

import KeyboardGradientView from '../../../../components/views/KeyboardGradientView'
import Card from '../../../../components/atoms/Card'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import SecondaryButton from '../../../../components/buttons/SecondaryButton'

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
      <Text h2Style = {styles.header} h2>Create your profile</Text>
      <Card style = {styles.card}>
        <Text h4>Tell us a bit about your service</Text>
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
        <View style = {styles.rowView}>
          <SecondaryButton
            title = "Back"
            containerStyle = {styles.button}
            onPress = {() => navigation.goBack()}
          />
          <PrimaryButton
            title = "Next"
            disabled = {description.length === 0}
            containerStyle = {styles.button}
            onPress = {() => submit()}
          />
        </View>
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
    right: 15
  },
  header: {
    marginTop: 100,
    color: colours.gray0
  },
  card: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    width: '90%',
    marginTop: 10
  },
  input: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    width: '85%',
    height: 200,
    borderWidth: 1,
    borderColor: colours.gray3,
  },
  rowView: {
    flexDirection: 'row',
    marginTop: 20
  },
  button: {
    marginHorizontal: 10
  }
})

export default index

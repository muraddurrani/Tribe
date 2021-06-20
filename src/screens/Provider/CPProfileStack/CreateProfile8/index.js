import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Text } from 'react-native-elements'
import KeyboardView from '../../../../components/atoms/KeyboardView'
import ScreenView from '../../../../components/atoms/ScreenView'
import PrimaryButton from '../../../../components/atoms/PrimaryButton'
import Header from '../../../../components/atoms/Header'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import theme from '../../../../styles/theme'

function index({ navigation }) {

  const [description, setDescription] = useState('')

  const submit = () => {
    firestore().collection('Providers').doc(auth().currentUser.uid).update({description})
    firestore().collection('Users').doc(auth().currentUser.uid).update({profileComplete: true})
  }

  return (
    <KeyboardView style = {styles.container}>
      <Header>Create your profile</Header>
      <ScreenView style = {styles.card}>
        <Text style = {styles.description} h4>Please provide a brief description of your service.</Text>
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
          onPress = {() => {
            submit()
            navigation.navigate('CP9')
          }}
          containerStyle = {styles.nextButton}
        />
      </ScreenView>
    </KeyboardView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colours.primary
  },
  card: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    backgroundColor: theme.colours.gray1
  },
  description: {
    marginTop: 35
  },
  input: {
    marginTop: 20,
    padding: theme.spacing.spacing4,
    borderRadius: 10,
    width: 340,
    height: 200,
    backgroundColor: theme.colours.gray0,
    borderColor: theme.colours.gray2,
    borderWidth: 1
  },
  nextButton: {
    marginTop: 30
  }
})

export default index

import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import ScreenView from '../../../../../components/atoms/ScreenView'
import PrimaryButton from '../../../../../components/atoms/PrimaryButton'
import theme from '../../../../../styles/theme'
import _ from 'lodash'

function index({ navigation }) {

  const fetchData = async () => {
    const doc = await firestore().collection('Providers').doc(auth().currentUser.uid).get()
    const data = doc.data()
    return data
  }

  const [loading, setLoading] = useState(false)

  return (
    <ScreenView style = {styles.container}>
      <Text h2>Your profile is incomplete</Text>
      <Text h4Style = {styles.text} h4>Please complete your profile so we can find the best clients for you!</Text>
      <PrimaryButton
        loading = {loading}
        title = "Complete Profile"
        containerStyle = {styles.buttonContainer}
        buttonStyle = {styles.button}
        onPress = {() => {
          
          fetchData().then(data => {
            setLoading(true)
            if (!_.has(data, 'name')) {
              navigation.navigate('CP0')
            } else if (!_.has(data, 'Responses.0')) {
              navigation.navigate('CP1')
            } else if (!_.has(data, 'Responses.1')) {
              navigation.navigate('CP2')
            } else if (!_.has(data, 'Responses.2')) {
              navigation.navigate('CP3')
            } else if (!_.has(data, 'Responses.3')) {
              navigation.navigate('CP4')
            } else if (!_.has(data, 'Responses.4')) {
              navigation.navigate('CP5')
            } else if (!_.has(data, 'Responses.5')) {
              navigation.navigate('CP6')
            } else if (!_.has(data, 'Responses.6')) {
              navigation.navigate('CP7')
            } else {
              navigation.navigate('CP8')
            }
          })
        }}
        />
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colours.gray1,
    padding: theme.spacing.spacing4
  },
  buttonContainer: {
    width: 150
  },
  button: {
    backgroundColor: theme.colours.primary
  },
  text: {
    textAlign: 'center',
    marginTop: theme.spacing.spacing2,
    marginBottom: theme.spacing.spacing5
  }
})

export default index

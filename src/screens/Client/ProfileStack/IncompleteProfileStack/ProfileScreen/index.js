import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import ScreenView from '../../../../../components/atoms/ScreenView'
import PrimaryButton from '../../../../../components/atoms/PrimaryButton'
import theme from '../../../../../styles/theme'

function index({ navigation }) {

  const fetchData = async () => {
    const doc = await firestore().collection('Clients').doc(auth().currentUser.uid).get()
    const data = doc.data()
    return data
  }

  const [loading, setLoading] = useState(false)

  return (
    <ScreenView style = {styles.container}>
      <Text h2>Your profile is incomplete</Text>
      <Text h4Style = {styles.text} h4>Please complete your profile so we can find the best service providers for your needs!</Text>
      <PrimaryButton
        loading = {loading}
        title = "Complete Profile"
        containerStyle = {styles.buttonContainer}
        buttonStyle = {styles.button}
        onPress = {() => {
          
          fetchData().then(data => {
            setLoading(true)
            if (data.parentName) {
              navigation.navigate('CP1')
            } else {
              navigation.navigate('CP0')
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

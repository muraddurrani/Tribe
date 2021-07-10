import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Icon, Text } from 'react-native-elements'
import _ from 'lodash'

import { AuthContext } from '../../../../navigation/AuthProvider'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import colours from '../../../../styles/colours'

import GradientView from '../../../../components/views/GradientView'

function index({ navigation }) {
  const [loading, setLoading] = useState(false)
  const { userData } = useContext(AuthContext)

  return (
    <GradientView style = {styles.container}>
      <Icon name = "alert-triangle" color = {colours.gray0} size = {100} containerStyle = {styles.icon} />
      <Text h1>Your profile is incomplete</Text>
      <Text h4Style = {styles.description} h4>Please complete your profile so we can find the best service providers for your needs!</Text>
      <PrimaryButton
        loading = {loading}
        title = "Complete Profile"
        containerStyle = {styles.buttonContainer}
        buttonStyle = {styles.button}
        titleStyle = {styles.buttonTitle}
        onPress = {() => {
          setLoading(true)
          if (_.has(userData, 'parentFullName')) {
            navigation.navigate('CP2')
          } else {
            navigation.navigate('CP1')
          }
      }}
        />
    </GradientView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 30
  },
  icon: {
    marginTop: '40%',
    marginBottom: 30,
  },
  description: {
    color: colours.gray0,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30
  },
  buttonContainer: {
    width: 160
  },
  button: {
    width: 160,
    backgroundColor: colours.gray0
  },
  buttonTitle: {
    color: colours.midpoint1
  }
})

export default index

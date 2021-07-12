import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import {Overlay, Text, Icon } from 'react-native-elements'
import colours from '../../../../styles/colours'
import { AuthContext } from '../../../../navigation/AuthProvider'

import PrimaryButton from '../../../../components/buttons/PrimaryButton'

function ErrorOverlay({isVisible}) {
  const { logout } = useContext(AuthContext)

  return (
    <Overlay
      overlayStyle = {styles.container}
      isVisible = {isVisible}
      >

      <Icon
        name = "check-circle"
        color = {colours.midpoint3}
        size = {40}
        containerStyle = {styles.icon}
      />
      <Text h3Style = {styles.header} h3>Your password was changed successfully!</Text>
      <Text style = {styles.text}>Please log in again to continue using Tribe.</Text>
      <PrimaryButton
        title = "Log Out"
        onPress = {() => logout()}
      />
    </Overlay>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    borderRadius: 15
  },
  header: {
    marginBottom: 15,
    textAlign: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 30
  },
  icon: {
    marginBottom: 5
  }
})

export default ErrorOverlay

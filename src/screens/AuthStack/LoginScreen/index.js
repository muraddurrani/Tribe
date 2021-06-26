import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'

import LoginForm from './LoginForm'
import DetailsOverlay from './DetailsOverlay'
import KeyboardScrollView from '../../../components/views/KeyboardScrollView'
import TertiaryButton from '../../../components/buttons/TertiaryButton'

import colours from '../../../styles/colours'

function index({ navigation }) {

  const [showOverlay, setShowOverlay] = useState(false)

  return (
    <KeyboardScrollView>
      <Image style = {styles.logo}
        source = {require('../../../assets/images/Logo_Ubuntu_White.png')}
      />
      <View style = {styles.card}>
        <LoginForm />
        <View style = {styles.rowView}>
          <Text>Don't have an account?</Text>
          <TertiaryButton
            title = "Sign up!"
            style = {styles.signUpButton}
            onPress = {() => navigation.navigate('Register')}
          />
        </View>
        <TertiaryButton
          title = "What is Tribe?"
          style = {styles.detailsButton}
          onPress = {() => setShowOverlay(true)}
        />
      </View>
      <DetailsOverlay
        isVisible = {showOverlay}
        onPress = {() => setShowOverlay(false)}
      />
    </KeyboardScrollView>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: 70,
    width: 235,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: '25%'
  },
  card: {
    flex: 1,
    backgroundColor: colours.gray0,
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 40,
    marginTop: '10%'
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  signUpButton: {
    marginLeft: 10
  },
  detailsButton: {
    position: 'absolute',
    bottom: 30
  }
})

export default index
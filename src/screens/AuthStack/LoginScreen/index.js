import React, { useState } from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { Image, Text } from 'react-native-elements'
import KeyboardView from '../../../components/atoms/KeyboardView'
import TertiaryButton from '../../../components/atoms/TertiaryButton'
import LoginForm from './LoginForm'
import DetailsOverlay from './DetailsOverlay'
import theme from '../../../styles/theme'
import { Dimensions } from 'react-native'

function index({ navigation }) {

  const [show, setShow] = useState(false)

  return (
      <KeyboardView>
        <ImageBackground source = {require('../../../assets/images/Login_Background.png')} style = {styles.container}>

        <Image
          source = {require('../../../assets/images/Logo_Ubuntu_Inverse.png')}
          containerStyle= {styles.imageContainer}
          style = {styles.image}
        />
        <LoginForm />
        <View style = {styles.createAccView}>
          <Text>Don't have an account?</Text>
          <TertiaryButton
            containerStyle = {styles.signUpButtonContainer}
            buttonStyle = {styles.tertiaryButton}
            title = "Sign up!"
            onPress = {() => navigation.navigate('Register')}
          />
        </View>
        <TertiaryButton
          containerStyle = {styles.detailsButton}
          buttonStyle = {styles.tertiaryButton}
          title = "What is Tribe?"
          onPress = {() => setShow(true)}
        />
        <DetailsOverlay
          isVisible = {show}
          onPress = {() => setShow(false)}
        />
        </ImageBackground>
      </KeyboardView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute'
  },
  imageContainer: {
    marginTop: 60,
    marginBottom: 40
  },
  image: {
    height: 70,
    width: 220,
    resizeMode: 'contain'
  },
  forgotPassButton: {
    width: 140
  },
  createAccView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpButtonContainer: {
    width: 70
  },
  detailsButton: {
    marginTop: 40
  },
  tertiaryButton: {
    backgroundColor: theme.colours.gray2
  }
})

export default index
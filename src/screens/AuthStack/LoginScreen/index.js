import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import TertiaryButton from '../../../components/buttons/TertiaryButton'
import KeyboardGradientView from '../../../components/views/KeyboardGradientView'
import LoginForm from './LoginForm'
import colours from '../../../styles/colours'

function index({ navigation }) {
  return (
    <KeyboardGradientView>
      <Image
        style = {styles.logo}
        source = {require('../../../assets/images/Logo_Text_White.png')}
      />
      <View style = {styles.card}>
        <LoginForm />
        <View style = {styles.rowView}>
          <Text>Don't have an account?</Text>
          <TertiaryButton
            title = "Sign up!"
            style = {styles.signupButton}
            onPress = {() => navigation.navigate('Register')}
          />
        </View>
        <TertiaryButton
          title = "What is Tribe?"
          style = {styles.detailsButton}
        />
      </View>
    </KeyboardGradientView>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: 60,
    width: 176,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: '25%'
  },
  card: {
    flex: 1,
    backgroundColor: colours.gray0,
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 50,
    marginTop: 30
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  signupButton: {
    marginLeft: 10
  },
  detailsButton: {
    marginTop: 50
  }
})

export default index

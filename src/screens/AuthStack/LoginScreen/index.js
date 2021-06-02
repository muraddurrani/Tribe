import React, {useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Image, Button } from 'react-native-elements'
import { AuthContext } from '../../../navigation/AuthProvider'

import EmailInput from '../../../components/atoms/EmailInput'
import PasswordInput from '../../../components/atoms/PasswordInput'
import TouchableText from '../../../components/atoms/TouchableText'
import DetailsOverlay from './DetailsOverlay'
import { NavigationContainer } from '@react-navigation/native'

function index({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [toggleOverlay, setToggleOverlay] = useState(false)
  const { login } = useContext(AuthContext)

  return (
    <View style = {styles.container} >
      <Image source = {require('../../../assets/images/Logo_Ubuntu.png')} containerStyle = {styles.imageContainer} style = {styles.image}/>
      <EmailInput onChangeText = {(email) => setEmail(email)}/>
      <PasswordInput onChangeText = {(password) => setPassword(password)}/>
      {
      /* <TouchableText text = "Forgot Password?"/> ---- Implement later*/ 
    }
      <Button containerStyle = {styles.buttonContainer} title = "Log In" onPress = {() => login(email, password)}/>
      <Button containerStyle = {styles.buttonContainer} title = "Create an Account" type = "clear" onPress = {() => navigation.navigate('Register')}/>
      <TouchableText style = {styles.detailsText} text = "What is Tribe?" onPress = {() => setToggleOverlay(true)}/>

      {
        toggleOverlay && (
          <DetailsOverlay onPress = {() => setToggleOverlay(false)}/>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc'
  },
  imageContainer: {
    height: '12.8%',
    width: '50%',
    marginBottom: 20
  },
  image: {
    resizeMode: 'contain'
  },
  buttonContainer: {
    marginTop: 20
  },
  detailsText: {
    marginTop: 50
  }
})

export default index

import React, { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, CheckBox, Image, Text } from 'react-native-elements'
import { AuthContext } from '../../../navigation/AuthProvider'

import EmailInput from '../../../components/atoms/EmailInput'
import NameInput from '../../../components/atoms/NameInput'
import PasswordInput from '../../../components/atoms/PasswordInput'

function index() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [clientCheck, setClientCheck] = useState(true)
  const [proCheck, setProCheck] = useState(false)
  const { register } = useContext(AuthContext)

  return (
    <View style = {styles.container}>
      <Image source = {require('../../../assets/images/Logo_Ubuntu.png')} containerStyle = {styles.imageContainer} style = {styles.image}/>
      <NameInput onChangeFirstName = {(text) => setFirstName(text)} onChangeLastName = {(text) => setLastName(text)}/>
      <EmailInput onChangeText = {(email) => setEmail(email)}/>
      <PasswordInput onChangeText = {(password) => setPassword(password)}/>
      {/*
        <View>
        <Text style = {styles.textStyle}> I am a:</Text>
        <CheckBox containerStyle = {styles.checkBoxContainer} textStyle = {styles.textStyle} title = "Parent/Caregiver" checked = {clientCheck}
          onPress = {() => {
            setClientCheck(!clientCheck)
            setProCheck(false)
          }}/>
        <CheckBox containerStyle = {styles.checkBoxContainer} textStyle = {styles.textStyle} title = "Professional" checked = {proCheck}
          onPress = {() => {
            setProCheck(!proCheck)
            setClientCheck(false)
          }}/>
      </View>
        */}
      <Button containerStyle = {styles.buttonContainer} title = "Create Account" onPress = {() => register(email, password, firstName, lastName, clientCheck)}/>
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
  checkBoxContainer: {
    borderWidth: 0,
    backgroundColor: 'transparent'
  },
  buttonContainer: {
    marginTop: 20
  },
  textStyle: {
    fontWeight: 'normal'
  }
})

export default index

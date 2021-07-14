import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {Overlay, Text, Icon } from 'react-native-elements'
import { Input } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { Formik } from 'formik'
import * as yup from 'yup'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import colours from '../../../../styles/colours'

const reviewSchema = yup.object({
  password: yup.string().required('Please provide your password')
})

function DeleteOverlay({isVisible, onPress}) {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  return (
    <Overlay
      overlayStyle = {styles.container}
      isVisible = {isVisible}
      >
      <Icon
        containerStyle = {styles.icon}
        name = "x"
        onPress = {onPress}
      />
      <Text h2Style = {styles.header} h2>Delete Account</Text>
      <Formik
        initialValues = {{password: ''}}
        validationSchema = {reviewSchema}
        onSubmit = {(values) => {
          setLoading(true)
          const user = auth().currentUser
          const cred = auth.EmailAuthProvider.credential(user.email, values.password)
          
          user.reauthenticateWithCredential(cred).
            then(() => {
              firestore().collection('Clients').doc(user.uid).delete()
              firestore().collection('Users').doc(user.uid).delete()
              user.delete()
            }).
            catch((error) => {
              if (error.code == 'auth/wrong-password') {
                setError('The password you entered is incorrect')
              } else {
                setError(error.message)
              }
              setLoading(false)
            })
        }}
      >
        {(formikProps) => (
          <View style = {styles.form}>
            {error && <Text style = {styles.error}>{error}</Text>}
            <Input
              label = "Password"
              placeholder = "Your password"
              leftIcon = {<Icon name = "key"/>}
              onChangeText = {formikProps.handleChange('password')}
              value = {formikProps.values.password}
              onBlur = {formikProps.handleBlur('password')}
              errorMessage = {formikProps.touched.password && formikProps.errors.password}
              secureTextEntry
            />
            <PrimaryButton
              title = "Delete Account"
              onPress = {formikProps.handleSubmit}
              containerStyle = {styles.buttonContainer}
              buttonStyle = {styles.button}
              loading = {loading}
            />
          </View>
        )}
      </Formik>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 15
  },
  header: {
    marginBottom: 10
  },
  icon: {
    alignSelf: 'flex-end'
  },
  form: {
    marginTop: 20
  },
  buttonContainer: {
    marginTop: 10,
    width: 160,
    alignSelf: 'center'
  },
  button: {
    width: 160
  },
  error: {
    color: colours.midpoint3
  }
})

export default DeleteOverlay

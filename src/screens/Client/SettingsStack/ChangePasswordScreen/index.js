import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import { Formik } from 'formik'
import * as yup from 'yup'

import ErrorOverlay from './ErrorOverlay'
import SuccessOverlay from './SuccessOverlay'
import KeyboardScreenView from '../../../../components/views/KeyboardScreenView'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import Header from '../../../../components/molecules/Header'
import colours from '../../../../styles/colours'

const reviewSchema = yup.object({
  currentPass: yup.string().required('Please provide your current password'),
  newPass: yup.string().required('Please provide your new password').min(6),
  confirmNewPass: yup.string().required('Please confirm your new password').oneOf([yup.ref('newPass'), null], 'Passwords do not match')
})

function index({ navigation }) {
  const [fbError, setFBError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [passChanged, setPassChanged] = useState(false)
  return (
    <KeyboardScreenView>
      <Header icon title = "Change Password" onPress = {() => navigation.goBack()} />

      <Formik
        initialValues = {{currentPass: '', newPass: '', confirmNewPass: ''}}
        validationSchema = {reviewSchema}
        onSubmit = {(values) => {
          setLoading(true)
          const user = auth().currentUser
          const cred = auth.EmailAuthProvider.credential(user.email, values.currentPass)
          user.reauthenticateWithCredential(cred).
            then(() => {
              user.updatePassword(values.newPass)
            }).then(() => {
              setPassChanged(true)
              setLoading(false)
            }).catch((error) => {
              if (error.code == 'auth/wrong-password') {
                setErrorMsg('The password you entered is incorrect')
              } else {
                setErrorMsg(error.message)
              }
              setFBError(true)
              setLoading(false)
            })
        }}
      >
        {(formikProps) => (
          <View style = {styles.form}>
            <Input
              label = "Current Password"
              placeholder = "Your current password"
              containerStyle = {styles.input}
              onChangeText = {formikProps.handleChange('currentPass')}
              value = {formikProps.values.currentPass}
              onBlur = {formikProps.handleBlur('currentPass')}
              errorMessage = {formikProps.touched.currentPass && formikProps.errors.currentPass}
              secureTextEntry
            />
            <Input
              label = "New Password"
              placeholder = "Your new password"
              containerStyle = {styles.input}
              onChangeText = {formikProps.handleChange('newPass')}
              value = {formikProps.values.newPass}
              onBlur = {formikProps.handleBlur('newPass')}
              errorMessage = {formikProps.touched.newPass && formikProps.errors.newPass}
              secureTextEntry
            />
            <Input
              label = "Confirm New Password"
              placeholder = "Confirm your new password"
              containerStyle = {styles.input}
              onChangeText = {formikProps.handleChange('confirmNewPass')}
              value = {formikProps.values.confirmNewPass}
              onBlur = {formikProps.handleBlur('confirmNewPass')}
              errorMessage = {formikProps.touched.confirmNewPass && formikProps.errors.confirmNewPass}
              secureTextEntry
            />
            <PrimaryButton
              title = "Confirm"
              containerStyle = {styles.buttonContainer}
              onPress = {formikProps.handleSubmit}
              loading = {loading}
            />
          </View>
        )}
      </Formik>
      <ErrorOverlay isVisible = {fbError} message = {errorMsg} onPress = {() => setFBError(false)}/>
      <SuccessOverlay isVisible = {passChanged}/>
    </KeyboardScreenView>
  )
}

const styles = StyleSheet.create({
  form: {
    marginTop: 50,
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: colours.gray0
  },
  input: {
    marginBottom: 20
  },
  buttonContainer: {
    alignSelf: 'center'
  }
})

export default index

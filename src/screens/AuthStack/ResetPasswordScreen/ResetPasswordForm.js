import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Icon } from 'react-native-elements'
import { Formik } from 'formik'
import * as yup from 'yup'
import auth from '@react-native-firebase/auth'

import { useNavigation } from '@react-navigation/native'
import PrimaryButton from '../../../components/buttons/PrimaryButton'
import SecondaryButton from '../../../components/buttons/SecondaryButton'
import ErrorOverlay from '../LoginScreen/ErrorOverlay'

const reviewSchema = yup.object({
  email: yup.string().required('Please provide your email address').email('Please provide a valid email')
})

function ResetPasswordForm() {
  const [fbError, setFBError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  const resetPass = async (email) => {
    try {
      setLoading(true)
      await auth().sendPasswordResetEmail(email)
      navigation.navigate('ConfirmReset')
    } catch (error) {
      if (error.code == 'auth/user-not-found') {
        setErrorMsg("There is no user registered to this email address.")
      }
      setFBError(true)
      setLoading(false)
    }
  }

  return (
    <Formik
      initialValues = {{ email: ''}}
      validationSchema = {reviewSchema}
      onSubmit = {(values) => {
        resetPass(values.email)
      }}
      >
      {(formikProps) => (
        <View>
          <Input
            containerStyle = {styles.input}
            label = "Email Address"
            placeholder = "e.g. email@address.com"
            onChangeText = {formikProps.handleChange('email')}
            value = {formikProps.values.email}
            leftIcon = {<Icon name = "mail"/>}
            keyboardType = 'email-address'
            onBlur = {formikProps.handleBlur('email')}
            errorMessage = {formikProps.touched.email && formikProps.errors.email}
          />
          <View style = {styles.rowView} >
            <SecondaryButton
               title = "Cancel"
               containerStyle = {styles.buttonContainer}
               onPress = {() => navigation.goBack()}
            />
            <PrimaryButton
              loading = {loading}
              title = {"Reset"}
              containerStyle = {styles.buttonContainer}
              onPress = {formikProps.handleSubmit}
            />
          </View>
          <ErrorOverlay isVisible = {fbError} message = {errorMsg} onPress = {() => setFBError(false)}/>
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  input: {
    marginTop: 25,
  },
  rowView: {
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  input: {
    marginTop: 40,
    marginBottom: 10
  },
  buttonContainer: {
    marginRight: 10
  }
})

export default ResetPasswordForm

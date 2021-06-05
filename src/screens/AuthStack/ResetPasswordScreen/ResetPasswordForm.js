import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Icon } from 'react-native-elements'
import { Formik } from 'formik'
import * as yup from 'yup'
import SecondaryButton from '../../../components/atoms/SecondaryButton'
import PrimaryButton from '../../../components/atoms/PrimaryButton'
import auth from '@react-native-firebase/auth'
import ErrorOverlay from '../LoginScreen/ErrorOverlay'
import theme from '../../../styles/theme'
import { useNavigation } from '@react-navigation/native';

const reviewSchema = yup.object({
  email: yup.string().required('Please provide your email address').email('Please provide a valid email')
})




function ResetPasswordForm(props) {

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
    } finally {
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
        <View style = {props.style}>
          <Input
            label = "Email Address"
            placeholder = "e.g. email@address.com"
            onChangeText = {formikProps.handleChange('email')}
            value = {formikProps.values.email}
            leftIcon = {<Icon name = "mail"/>}
            keyboardType = 'email-address'
            onBlur = {formikProps.handleBlur('email')}
            errorMessage = {formikProps.touched.email && formikProps.errors.email}
          />
          <View style = {styles.buttonsView} >
            <SecondaryButton
              containerStyle = {styles.button}
               title = "Cancel"
               onPress = {() => navigation.goBack()}
            />
            <PrimaryButton
              containerStyle = {styles.button}
              loading = {loading}
              title = {"Reset"}
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
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    marginRight: theme.spacing.spacing1
  }
})

export default ResetPasswordForm

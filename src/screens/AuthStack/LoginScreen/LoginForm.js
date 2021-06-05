import React, { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Icon } from 'react-native-elements'
import { Formik } from 'formik'
import * as yup from 'yup'
import PrimaryButton from '../../../components/atoms/PrimaryButton'
import TertiaryButton from '../../../components/atoms/TertiaryButton'
import ErrorOverlay from './ErrorOverlay'
import { AuthContext } from '../../../navigation/AuthProvider'
import theme from '../../../styles/theme'
import { useNavigation } from '@react-navigation/native';

const reviewSchema = yup.object({
  email: yup.string().required('Please provide your email address').email('Please provide a valid email'),
  password: yup.string().required('Please provide your password')
})

function LoginForm() {
  const { login } = useContext(AuthContext)
  const [fbError, setFBError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const navigation = useNavigation()

  return (
    <Formik
      initialValues = {{ email: '', password: ''}}
      validationSchema = {reviewSchema}
      onSubmit = {(values) => {
        setLoading(true)
        login(values.email, values.password).
          catch(error => {
            if (error.code == 'auth/user-not-found') {
              setErrorMsg("There is no user registered to this email address.")
            }
            if (error.code == 'auth/wrong-password') {
              setErrorMsg("The password you entered is incorrect.")
            }
            setFBError(true)
            }).
          finally(() => setLoading(false))
      }}
      >
      {(formikProps) => (
        <View style = {styles.container}>
          <Input
            containerStyle = {styles.inputContainer}
            label = "Email Address"
            placeholder = "e.g. email@address.com"
            onChangeText = {formikProps.handleChange('email')}
            value = {formikProps.values.email}
            leftIcon = {<Icon name = "mail"/>}
            keyboardType = 'email-address'
            onBlur = {formikProps.handleBlur('email')}
            errorMessage = {formikProps.touched.email && formikProps.errors.email}
          />
          <Input
            containerStyle = {styles.inputContainer}
            label = "Password"
            placeholder = "Your password"
            onChangeText = {formikProps.handleChange('password')}
            value = {formikProps.values.password}
            leftIcon = {<Icon name = "key"/>}
            rightIcon = {<Icon name = {showPass ? "eye-off" : "eye"} onPress = {() => setShowPass(!showPass)}/>}
            secureTextEntry = {!showPass}
            onBlur = {formikProps.handleBlur('password')}
            errorMessage = {formikProps.touched.password && formikProps.errors.password}
          />
          <TertiaryButton
            containerStyle = {styles.forgotPassButton}
            title = "Forgot Password?"
            onPress = {() => navigation.navigate('ResetPassword')}
          />
          <PrimaryButton
            containerStyle = {styles.loginButton}
            title = "Log In"
            loading = {loading}
            onPress = {formikProps.handleSubmit}
          />
          <ErrorOverlay isVisible = {fbError} message = {errorMsg} onPress = {() => setFBError(false)}/>
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    marginTop: theme.spacing.spacing1,
  },
  forgotPassButton: {
    alignSelf: 'flex-end',
    width: 140,
    height: 30
  },
  loginButton: {
    marginTop: theme.spacing.spacing5
  },
})

export default LoginForm

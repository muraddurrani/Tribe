import React, { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Icon, Text } from 'react-native-elements'
import { Formik } from 'formik'
import * as yup from 'yup'

import { AuthContext } from '../../../navigation/AuthProvider'
import PrimaryButton from '../../../components/buttons/PrimaryButton'
import SecondaryButton from '../../../components/buttons/SecondaryButton'
import ErrorOverlay from '../LoginScreen/ErrorOverlay'

import colours from '../../../styles/colours'

const reviewSchema = yup.object({
  email: yup.string().required('Please provide your email address').email('Please provide a valid email'),
  password: yup.string().required('Please provide a password').min(6)
})

function RegisterForm() {
  const [fbError, setFBError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [accType, setAccType] = useState()
  const [clientPressed, setClientPressed] = useState(false)
  const [providerPressed, setProviderPressed] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)
  const { signup } = useContext(AuthContext)

  return (
    <Formik
      initialValues = {{email: '', password: ''}}
      validationSchema = {reviewSchema}
      onSubmit = {(values) => {
        setLoading(true)
        signup(values.email, values.password, accType).
          catch((error) => {
            if (error.code == 'auth/email-already-in-use') {
              setErrorMsg("This email address is already in use.")
            }
            else {
              setErrorMsg(error.message)
            }
            setFBError(true)
            setLoading(false)
          })
      }}
    >
      {(formikProps) => (
        <View style = {styles.container}>
          <Input
            containerStyle = {styles.input}
            label = "Email Address"
            placeholder = "e.g. email@address.com"
            onChangeText = {formikProps.handleChange('email')}
            value = {formikProps.values.email}
            leftIcon = {<Icon name = "mail"/>}
            onBlur = {formikProps.handleBlur('email')}
            keyboardType = 'email-address'
            errorMessage = {formikProps.touched.email && formikProps.errors.email}
          />
          <Input
            containerStyle = {styles.input}
            label = "Password"
            placeholder = "Enter password"
            onChangeText = {formikProps.handleChange('password')}
            value = {formikProps.values.password}
            leftIcon = {<Icon name = "key"/>}
            rightIcon = {<Icon name = {showPass ? "eye-off" : "eye"} onPress = {() => setShowPass(!showPass)}/>}
            onBlur = {formikProps.handleBlur('password')}
            secureTextEntry = {!showPass}
            errorMessage = {formikProps.touched.password && formikProps.errors.password}
          />
          <Text>I am joining as a</Text>
          <View style = {styles.rowView}>
            <SecondaryButton
              title = "Parent"
              containerStyle = {styles.accountButtonContainer}
              buttonStyle = {styles.accountButton}
              titleStyle = {clientPressed ? styles.pressed : styles.unpressed}
              onPress = {() => {
                setAccType('Clients')
                setClientPressed(true)
                setProviderPressed(false)
                setCanSubmit(true)
              }}
            />
            <SecondaryButton
              title = "Professional"
              containerStyle = {styles.accountButtonContainer}
              buttonStyle = {styles.accountButton}
              titleStyle = {providerPressed ? styles.pressed : styles.unpressed}
              onPress = {() => {
                setAccType('Providers')
                setProviderPressed(true)
                setClientPressed(false)
                setCanSubmit(true)
              }}
            />
          </View>
          <PrimaryButton
            title = "Sign Up"
            disabled = {!canSubmit}
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
    alignItems: 'center'
  },
  input: {
    marginBottom: 30
  },
  rowView: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 30
  },
  accountButtonContainer: {
    marginHorizontal: 10
  },
  accountButton: {
    borderColor: 'transparent'
  },
  unpressed: {
    color: colours.gray4
  },
  pressed: {
    color: colours.midpoint1
  }
})

export default RegisterForm

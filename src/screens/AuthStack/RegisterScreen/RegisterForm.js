import React, { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Icon, Text } from 'react-native-elements'
import { Formik } from 'formik'
import * as yup from 'yup'
import PrimaryButton from '../../../components/atoms/PrimaryButton'
import ErrorOverlay from '../LoginScreen/ErrorOverlay'
import SecondaryButton from '../../../components/atoms/SecondaryButton'
import colours from '../../../styles/colours'
import { AuthContext } from '../../../navigation/AuthProvider'
import theme from '../../../styles/theme'

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
              label = "Password"
              placeholder = "Enter a password"
              onChangeText = {formikProps.handleChange('password')}
              value = {formikProps.values.password}
              leftIcon = {<Icon name = "key"/>}
              rightIcon = {<Icon name = {showPass ? "eye-off" : "eye"} onPress = {() => setShowPass(!showPass)}/>}
              onBlur = {formikProps.handleBlur('password')}
              secureTextEntry = {!showPass}
              errorMessage = {formikProps.touched.password && formikProps.errors.password}
            />
              <Text style = {{marginTop: 30}}>I am joining as a:</Text>
              <View style = {styles.rowView}>
                <SecondaryButton
                  containerStyle = {styles.accTypeButton}
                  buttonStyle = {clientPressed ? styles.pressedButton : styles.unpressedButton}
                  titleStyle = {clientPressed ? styles.pressedTitle : styles.unpressedTitle}
                  title = "Parent"
                  onPress = {() => {
                    setAccType('Clients')
                    setClientPressed(true)
                    setProviderPressed(false)
                    setCanSubmit(true)
                  }}
                />
                <SecondaryButton
                  containerStyle = {styles.accTypeButton}
                  buttonStyle = {providerPressed ? styles.pressedButton : styles.unpressedButton}
                  titleStyle = {providerPressed ? styles.pressedTitle : styles.unpressedTitle}
                  title = "Professional"
                  onPress = {() => {
                    setAccType('Providers')
                    setProviderPressed(true)
                    setClientPressed(false)
                    setCanSubmit(true)
                  }}
                />
              </View>
              <PrimaryButton
                title = "Create Account"
                containerStyle = {styles.createAccButton}
                disabled = {!canSubmit}
                loading = {loading}
                onPress = {formikProps.handleSubmit}
              />
              <ErrorOverlay isVisible = {fbError} message = {errorMsg} onPress = {() => setFBError(false)}/>
              
        </View>
      )  
      }
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colours.gray0,
    borderRadius: 20,
    paddingTop: theme.spacing.spacing6
  },
  rowView: {
    marginTop: theme.spacing.spacing4,
    flexDirection: 'row'
  },
  pressedButton: {
    backgroundColor: colours.gray5
  },
  unpressedButton: {
    backgroundColor: colours.gray0
  },
  pressedTitle: {
    color: colours.gray0
  },
  unpressedTitle: {
    color: colours.gray6
  },
  accTypeButton: {
    marginHorizontal: theme.spacing.spacing2
  },
  createAccButton: {
    marginTop: theme.spacing.spacing5,
    marginBottom: theme.spacing.spacing5,
    width: 150
  }
})

export default RegisterForm

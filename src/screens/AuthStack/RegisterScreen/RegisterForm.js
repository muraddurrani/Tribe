import React, { useState, useContext } from 'react'
import { KeyboardAvoidingView, View, StyleSheet } from 'react-native'
import { Input, Icon, Text } from 'react-native-elements'
import { Formik } from 'formik'
import * as yup from 'yup'
import PrimaryButton from '../../../components/atoms/PrimaryButton'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import ErrorOverlay from '../LoginScreen/ErrorOverlay'
import SecondaryButton from '../../../components/atoms/SecondaryButton'
import TertiaryButton from '../../../components/atoms/TertiaryButton'
import colours from '../../../styles/colours'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../navigation/AuthProvider'

const reviewSchema = yup.object({
  firstName: yup.string().required('Please provide your first name'),
  lastName: yup.string().required('Please provide your last name'),
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
  const [disclaimer, setDisclaimer] = useState(false)
  const navigation = useNavigation()
  const { signup } = useContext(AuthContext)

  return (
    <Formik
      initialValues = {{firstName: '', lastName: '', email: '', password: '', number: '+65 '}}
      validationSchema = {reviewSchema}
      onSubmit = {(values) => {
        setLoading(true)
        signup(values.email, values.password, values.firstName, values.lastName, values.number, accType).
          catch(error => {
            if (error.code == 'auth/email-already-in-use') {
              setErrorMsg("This email address is already in use.")
            }
            setFBError(true)
          }).
          finally(() => setLoading(false))
      }}
      >
      {(formikProps) => (
        <KeyboardAvoidingView behavior = "padding">
          <View style = {styles.rowView}>
            <Input
              containerStyle = {styles.inputContainer}
              label = "First Name"
              placeholder = "e.g. John"
              onChangeText = {formikProps.handleChange('firstName')}
              value = {formikProps.values.firstName}
              onBlur = {formikProps.handleBlur('firstName')}
              errorMessage = {formikProps.touched.firstName && formikProps.errors.firstName}
            />
            <Input
              containerStyle = {styles.inputContainer}
              label = "Last Name"
              placeholder = "e.g. Doe"
              onChangeText = {formikProps.handleChange('lastName')}
              value = {formikProps.values.lastName}
              onBlur = {formikProps.handleBlur('lastName')}
              errorMessage = {formikProps.touched.lastName && formikProps.errors.lastName}
            />
          </View>
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
            {
              (disclaimer && <Text>Your number will only be shared people you match with</Text>)
            }
              <Input
                label = "Mobile Number (Optional)"
                placeholder = "e.g. 12345678"
                onChangeText = {formikProps.handleChange('number')}
                value = {formikProps.values.number}
                leftIcon = {<Icon name = "phone"/>}
                rightIcon = {<Icon name = 'info' onPress = {() => setDisclaimer(!disclaimer)}/>}
                onBlur = {formikProps.handleBlur('number')}
                keyboardType = 'numeric'
                errorMessage = {formikProps.touched.number && formikProps.errors.number}
              />
              <Text h4>I am a:</Text>
              <View style = {styles.rowView}>
                <SecondaryButton
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
              <TertiaryButton
                title = "Back to Login"
                onPress = {() => navigation.goBack()}
              />
              <ErrorOverlay isVisible = {fbError} message = {errorMsg} onPress = {() => setFBError(false)}/>
              
        </KeyboardAvoidingView>
      )  
      }
    </Formik>
  )
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row'
  },
  inputContainer: {
    width: 150,
    marginHorizontal: 5
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
  createAccButton: {
    width: 150
  }
})

export default RegisterForm

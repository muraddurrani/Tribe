import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Icon, Text } from 'react-native-elements'
import { Formik } from 'formik'
import * as yup from 'yup'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore' 
import KeyboardView from '../../../../components/atoms/KeyboardView'
import ScreenView from '../../../../components/atoms/ScreenView'
import PrimaryButton from '../../../../components/atoms/PrimaryButton'
import Header from '../../../../components/atoms/Header'
import theme from '../../../../styles/theme'

const reviewSchema = yup.object({
  name: yup.string().required('Please provide your full name')
})

function index({ navigation }) {
  return (
    <KeyboardView style = {styles.container}>
      <Header>Create your profile</Header>
      <ScreenView style = {styles.card}>
        <Text h4Style = {styles.description} h4>Please provide your particulars</Text>
        <Formik
          initialValues = {{name: '', number: ''}}
          validationSchema = {reviewSchema}
          onSubmit = {(values) => {
            firestore().collection('Providers').doc(auth().currentUser.uid).update({name: values.name, number: values.number})
            navigation.navigate('CP1')
          }}
        >
          {(formikProps) => (
            <View style = {styles.form}>
              <View style = {styles.inputContainer}>
                <Input
                  containerStyle = {styles.input}
                  label = "Full Name"
                  placeholder = "e.g. John Doe"
                  onChangeText = {formikProps.handleChange('name')}
                  value = {formikProps.values.name}
                  onBlur = {formikProps.handleBlur('name')}
                  errorMessage = {formikProps.touched.name && formikProps.errors.name}
                />
                <Input
                  containerStyle = {styles.input}
                  label = "Mobile Number (Optional)"
                  placeholder = "e.g. 12345678"
                  onChangeText = {formikProps.handleChange('number')}
                  value = {formikProps.values.number}
                  leftIcon = {<Icon name = "phone"/>}
                  keyboardType = 'numeric'
                />
              </View>
              <PrimaryButton
                title = "Next"
                containerStyle = {styles.nextButton}
                onPress = {formikProps.handleSubmit}
              />
            </View>
          )}
        </Formik>
      </ScreenView>
    </KeyboardView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colours.primary
  },
  card: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    backgroundColor: theme.colours.gray1
  },
  description: {
    marginTop: 50,
  },
  form: {
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: theme.colours.gray0,
    marginTop: theme.spacing.spacing6,
    padding: theme.spacing.spacing3,
    borderRadius: 15
  },
  input: {
    marginVertical: theme.spacing.spacing2
  },
  nextButton: {
    marginTop: theme.spacing.spacing6
  }
})

export default index

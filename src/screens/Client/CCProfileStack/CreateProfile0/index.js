import React, { useState } from 'react'
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
import Dropdown from '../../../../components/atoms/Dropdown'
import theme from '../../../../styles/theme'

const reviewSchema = yup.object({
  name: yup.string().required('Please provide your full name')
})

const list = ['Central Singapore', 'East Singapore', 'North Singapore', 'North-East Singapore', 'West Singapore']

function index({ navigation }) {

  const [location, setLocation] = useState()

  return (
    <KeyboardView style = {styles.container}>
      <Header>Create your profile</Header>
      <ScreenView style = {styles.card}>
        <Text h4Style = {styles.description} h4>Please provide your particulars</Text>
        <Formik
          initialValues = {{name: '', number: ''}}
          validationSchema = {reviewSchema}
          onSubmit = {(values) => {
            firestore().collection('Clients').doc(auth().currentUser.uid).update({parentName: values.name, number: values.number, location: location})
            navigation.navigate('CP1')
          }}
        >
          {(formikProps) => (
            <View style = {styles.form}>
              <View style = {styles.inputContainer}>
                <Input
                  label = "Full Name"
                  placeholder = "e.g. John Doe"
                  onChangeText = {formikProps.handleChange('name')}
                  value = {formikProps.values.name}
                  onBlur = {formikProps.handleBlur('name')}
                  errorMessage = {formikProps.touched.name && formikProps.errors.name}
                />
                <Input
                  label = "Mobile Number (Optional)"
                  placeholder = "e.g. 12345678"
                  onChangeText = {formikProps.handleChange('number')}
                  value = {formikProps.values.number}
                  leftIcon = {<Icon name = "phone"/>}
                  keyboardType = 'numeric'
                />
                <Dropdown
                  label = "Your Location"
                  placeholder = "Select location"
                  data = {list}
                  onSelect = {(location) => setLocation(location)}
                />
              </View>
              <PrimaryButton
                disabled = {!location}
                title = "Next"
                containerStyle = {styles.nextButton}
                onPress = {formikProps.handleSubmit}
                onSelect = {(location) => setLocation(location)}
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
    backgroundColor: theme.colours.gray0,
    marginTop: theme.spacing.spacing6,
    padding: theme.spacing.spacing3,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.colours.gray2
  },
  nextButton: {
    marginTop: theme.spacing.spacing5
  }
})

export default index

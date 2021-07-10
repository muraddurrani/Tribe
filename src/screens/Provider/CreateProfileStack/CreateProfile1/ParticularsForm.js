import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Icon } from 'react-native-elements'
import { Formik } from 'formik'
import * as yup from 'yup'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'

import PrimaryButton from '../../../../components/buttons/PrimaryButton'

const reviewSchema = yup.object({
  name: yup.string().required('Please provide your full name')
})

function ParticularsForm() {
  const navigation = useNavigation()
  
  return (
    <Formik
      initialValues = {{name: '', number: ''}}
      validationSchema = {reviewSchema}
      onSubmit = {(values) => {
        firestore().collection('Providers').doc(auth().currentUser.uid).update({fullName: values.name, phoneNumber: values.number})
        navigation.navigate('CP2')
      }}
    >
      {(formikProps) => (
        <View style = {styles.form}>
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
            label = "Mobile Number (Optional)"
            placeholder = "e.g. 12345678"
            onChangeText = {formikProps.handleChange('number')}
            value = {formikProps.values.number}
            leftIcon = {<Icon name = "phone"/>}
            keyboardType = 'numeric'
          />
          <PrimaryButton
            title = "Next"
            containerStyle = {styles.nextButton}
            onPress = {formikProps.handleSubmit}
          />
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  form: {
    alignItems: 'center'
  },
  input: {
    marginTop: 10
  },
  nextButton: {
    marginTop: 20
  }
})

export default ParticularsForm

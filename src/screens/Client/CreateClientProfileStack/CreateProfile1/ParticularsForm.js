import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Icon } from 'react-native-elements'
import { Formik } from 'formik'
import * as yup from 'yup'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'

import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import Dropdown from '../../../../components/molecules/Dropdown'

const reviewSchema = yup.object({
  name: yup.string().required('Please provide your full name')
})

const list = ['Central Singapore', 'East Singapore', 'North Singapore', 'North-East Singapore', 'West Singapore']

function ParticularsForm() {

  const navigation = useNavigation()
  const [location, setLocation] = useState()

  return (
    <Formik
      initialValues = {{name: '', number: ''}}
      validationSchema = {reviewSchema}
      onSubmit = {(values) => {
        firestore().collection('Clients').doc(auth().currentUser.uid).update({parentFullName: values.name, phoneNumber: values.number, location})
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
              containerStyle = {styles.input}
              label = "Mobile Number (Optional)"
              placeholder = "e.g. 12345678"
              onChangeText = {formikProps.handleChange('number')}
              value = {formikProps.values.number}
              leftIcon = {<Icon name = "phone"/>}
              keyboardType = 'numeric'
            />
            <Dropdown
              label = "Your Location"
              placeholder = "Select location..."
              data = {list}
              width = {340}
              height = {115}
              onSelect = {(location) => setLocation(location)}
            />
          <PrimaryButton
            title = "Next"
            disabled = {!location}
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
    alignItems: 'center',
    marginTop: 20
  },
  input: {
    marginBottom: 10
  },
  nextButton: {
    marginTop: 10
  }
})

export default ParticularsForm

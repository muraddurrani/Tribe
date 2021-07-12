import React, { useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Icon } from 'react-native-elements'
import { Formik } from 'formik'
import * as yup from 'yup'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../../../navigation/AuthProvider'

import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import Dropdown from '../../../../components/molecules/Dropdown'

const list = ['Central Singapore', 'East Singapore', 'North Singapore', 'North-East Singapore', 'West Singapore']

const reviewSchema = yup.object({
  name: yup.string().required('Please provide your full name')
})

function ParticularsForm() {
  const { userData } = useContext(AuthContext)
  const navigation = useNavigation()
  const [location, setLocation] = useState(userData.location)
  return (
    <Formik
      initialValues = {{name: userData.parentFullName, number: userData.phoneNumber}}
      validationSchema = {reviewSchema}
      onSubmit = {(values) => {
        firestore().collection('Clients').doc(auth().currentUser.uid).update({parentFullName: values.name, phoneNumber: values.number, location})
        navigation.popToTop()
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
            <Dropdown
              label = "Your Location"
              placeholder = "Select location..."
              defaultValue = {userData.location}
              data = {list}
              width = {320}
              height = {140}
              onSelect = {(location) => setLocation(location)}
            />
          <PrimaryButton
            title = "Confirm"
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

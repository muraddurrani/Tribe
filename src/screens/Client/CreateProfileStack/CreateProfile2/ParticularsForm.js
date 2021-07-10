import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import { Formik } from 'formik'
import * as yup from 'yup'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'

import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import SecondaryButton from '../../../../components/buttons/SecondaryButton'
import Dropdown from '../../../../components/molecules/Dropdown'
import DatePicker from '../../../../components/molecules/DatePicker'

const list = ['Male', 'Female', 'Others']

const reviewSchema = yup.object({
  name: yup.string().required('Please provide your full name')
})

function ParticularsForm() {
  const navigation = useNavigation()
  const [gender, setGender] = useState('')
  const [dob, setDOB] = useState()

  return (
    <Formik
      initialValues = {{name: ''}}
      validationSchema = {reviewSchema}
      onSubmit = {(values) => {
        firestore().collection('Clients').doc(auth().currentUser.uid).update({childFullName: values.name, childDOB: dob, childGender: gender})
        firestore().collection('Users').doc(auth().currentUser.uid).update({profileComplete: true})
        navigation.navigate('CP3')
      }}
    >
      {(formikProps) => (
        <View style = {styles.form}>
          <Input
            containerStyle = {styles.input}
            label = "Full Name"
            placeholder = "e.g. Jane Doe"
            onChangeText = {formikProps.handleChange('name')}
            value = {formikProps.values.name}
            onBlur = {formikProps.handleBlur('name')}
            errorMessage = {formikProps.touched.name && formikProps.errors.name}
          />
          <View style = {styles.rowView}>
            <DatePicker
              width = {160}
              label = "Date of Birth"
              placeholder = "Select D.O.B"
              onSelect = {(date) => setDOB(new Date(date.setUTCHours(0, 0, 0, 0)))}
            />
            <Dropdown
              width = {160}
              height = {120}
              label = "Gender (Optional)"
              placeholder = "Select gender"
              data = {list}
              onSelect = {(gender) => setGender(gender)}
            />
          </View>
          <View style = {styles.buttonView}>
            <SecondaryButton
              title = "Back"
              containerStyle = {styles.button}
              onPress = {() => navigation.goBack()}
            />
            <PrimaryButton
              title = "Next"
              disabled = {!dob}
              containerStyle = {styles.button}
              onPress = {formikProps.handleSubmit}
            />
          </View>
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
  rowView: {
    marginTop: 10,
    flexDirection: 'row'
  },
  buttonView: {
    flexDirection: 'row',
    marginTop: 20
  },
  button: {
    marginHorizontal: 10
  }
})

export default ParticularsForm

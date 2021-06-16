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
import Dropdown from '../../../../components/atoms/Dropdown'
import DatePicker from '../../../../components/atoms/DatePicker'
import Header from '../../../../components/atoms/Header'
import theme from '../../../../styles/theme'


const reviewSchema = yup.object({
  name: yup.string().required('Please provide your full name')
})
const list = ['Male', 'Female', 'Others']

function index({ navigation }) {

  const [gender, setGender] = useState('')
  const [dob, setDOB] = useState()

  return (
    <KeyboardView style = {styles.container}>
      <Header>Create your profile</Header>
      <ScreenView style = {styles.card}>
        <Text h4Style = {styles.description} h4>Please provide your child's particulars</Text>
        <Formik
          initialValues = {{name: ''}}
          validationSchema = {reviewSchema}
          onSubmit = {(values) => {
            firestore().collection('Clients').doc(auth().currentUser.uid).update({childName: values.name, childDOB: dob, childGender: gender})
            navigation.navigate('CP2')
          }}
        >
          {(formikProps) => (
            <View style = {styles.form}>
              <View style = {styles.inputContainer}>
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
                    label = "Date of Birth"
                    placeholder = "Select D.O.B"
                    onSelect = {(date) => {
                      setDOB(new Date(date.setUTCHours(0, 0, 0, 0)))
                    }}
                  />
                  <Dropdown
                    label = "Gender (Optional)"
                    placeholder = "Select gender"
                    data = {list}
                    onSelect = {(gender) => setGender(gender)}
                  />
                </View>
              </View>
              <PrimaryButton
                title = "Next"
                disabled = {!dob}
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
    backgroundColor: theme.colours.gray0,
    marginTop: theme.spacing.spacing6,
    padding: theme.spacing.spacing3,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.colours.gray2
  },
  input: {
    marginVertical: theme.spacing.spacing2
  },
  rowView: {
    flexDirection: 'row'
  },
  nextButton: {
    marginTop: theme.spacing.spacing6
  }
})

export default index

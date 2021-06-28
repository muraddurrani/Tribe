import React, { useState, useEffect, useContext } from 'react' 
import { StyleSheet, View, Text, ScrollView , Image} from 'react-native'
import { Input, BottomSheet, Icon } from 'react-native-elements'

import KeyboardView from '../../../../components/atoms/KeyboardView'
import ScreenView from '../../../../components/atoms/ScreenView'
import PrimaryButton from '../../../../components/atoms/PrimaryButton'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import theme from '../../../../styles/theme'
import DatePicker from '../../../../components/atoms/DatePicker'
import DropdownEdit from '../../../../components/atoms/DropdownEdit'

import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'

import { Formik } from 'formik'
import * as yup from 'yup'

import { AuthContext } from '../../../../navigation/AuthProvider'

const reviewSchema = yup.object({
  parentName: yup.string().required('Please provide your full name'),
  childName: yup.string().required('Please provide your full name')
})

function EditProfile({ navigation }) {
  const [childName, setChildName] = useState('')
  const [age, setAge] = useState()
  const [gender, setGender] = useState('')
  const [location, setLocation] = useState()
  const [parentName, setParentName] = useState('')
  const [email, setEmail] = useState('')
  const [number ,setNumber] = useState('')
  const [dob, setDOB] = useState()

  const [loading, setLoading] = useState(false)


  const [photo, setPhoto] = useState()
  const [photoPresent, setPhotoPresent] = useState(false)
  const [userData, setUserData] = useState(null)
  const { logout } = useContext(AuthContext)


  // const getUser = async () => {
  //   const doc = await firestore().collection('Clients').doc(auth().currentUser.uid).get()
  //   setUserData(doc.data())
  // }


  // useEffect(() => {
  //   getUser();
  // }, []);
  
  const getAge = (seconds) => {
    const dobMS = seconds * 1000
    const age = new Date() - dobMS
    return Math.floor(age / (1000 * 60 * 60 * 24 * 365))
  }

  const fetchData = async () => {
    const doc = await firestore().collection('Clients').doc(auth().currentUser.uid).get()
    const data = doc.data()
    return data
  }

  useEffect(() => {
    fetchData().then((data) => {
      setChildName(data.childName)
      setDOB(data.childDOB)
      setAge(getAge(data.childDOB.seconds))
      setGender(data.childGender)
      setLocation(data.location)
      setParentName(data.parentName)
      setEmail(data.email)
      setNumber(data.number)
      
      if (data.image) {
        setPhoto(data.image)
        setPhotoPresent(true)
      }
    })
  }, [])

  const handleUpdate = async() => {
    firestore()
    .collection('Clients')
    .doc(auth().currentUser.uid)
    .update({
      parentName: parentName,
      email: email,
      number: number,
      location: location,
      childName: childName,
      childDOB: dob,
      gender: gender,
      photo: photo
    })
    .then(() => {
      console.log('User Updated!');
      Alert.alert(
        'Profile Updated!',
        'Your profile has been updated successfully.'
      );
    })
    
    // if (photoPresent) {
    //   const filepath = `Clients/${auth().currentUser.uid}/${photo.substring(photo.length - 12)}`
    //   setLoading(true)
    //   await storage().ref().child(filepath).putFile(photo).
    //   then(() => storage().ref().child(filepath).getDownloadURL()).
    //   then(url => firestore().collection('Clients').doc(auth().currentUser.uid).update({ image: url}))
    // }

  }
 
  return (
    <ScrollView>  
      <ScreenView style={styles.container}>

        <Formik
          initialValues = {{parentName: parentName, number: number, childName: childName}}
          validationSchema = {reviewSchema}
          onSubmit = {handleUpdate}
          >

          {(formikProps) => (
            <View>
              {
                !photoPresent && (
                  <Avatar
                    containerStyle = {styles.avatar}
                    icon = {{name: 'user', color: theme.colours.gray5, type: 'feather'}}
                    size = {220}
                  />
                )
              }
              
              {
                photoPresent && (
                  <Image
                    source = {{uri: photo}}
                    style = {styles.image}
                  />
                )
              }

              <View style = {styles.inputContainer}>                       
              <Text h4 style = {styles.label}> Your details: </Text>
              <Input
                  label = "Full Name"
                  value = {parentName}
                  onChangeText = {(txt) => {
                    formikProps.handleChange('parentName') 
                    setParentName(txt)}}
                  onBlur = {formikProps.handleBlur('parentName')}
                  errorMessage = {formikProps.touched.name && formikProps.errors.name}
                />


                <Input
                  label = "Mobile Number (Optional)"
                  placeholder = "e.g. 12345678"
                  value = {number}
                  onChangeText = {(txt) => {
                    formikProps.handleChange('number')
                    setNumber(txt) 
                  }}
                  leftIcon = {<Icon name = "phone"/>}
                  keyboardType = 'numeric'
                />

                <DropdownEdit
                  label = "Your Location"
                  value = {location}
                  data = {['Central Singapore', 'East Singapore', 'North Singapore', 'North-East Singapore', 'West Singapore']}
                  onSelect = {(location) => setLocation(location)}
                />

                <Text h4 style = {styles.label}> Your child's particulars: </Text>

                <Input
                  containerStyle = {styles.input}
                  label = "Full Name"
                  onChangeText = {(txt) => {
                    formikProps.handleChange('childName')
                    setChildName(txt)}}
                  value = {childName}
                  onBlur = {formikProps.handleBlur('childName')}
                  errorMessage = {formikProps.touched.name && formikProps.errors.name}
                />

                <View style= {{flexDirection: 'row'}}>
                  <DatePicker
                      label = "Date of Birth"
                      placeholder = "Select D.O.B"
                      value = {new Date()}
                      onSelect = {(date) => {
                        setDOB(new Date(date.setUTCHours(0, 0, 0, 0)))
                      }}
                    />

                  <DropdownEdit
                    label = "Gender (Optional)"
                    value = {gender}
                    data = {['Male', 'Female', 'Others']}
                    onSelect = {(gender) => setGender(gender)}
                  />  

                </View>

              </View>

              <PrimaryButton
                title = 'Update'
                onPress = {() => {
                  formikProps.handleSubmit
                  navigation.navigate('ProfileScreen')
                  }}
              />
            </View>
          )}
        </Formik>
      </ScreenView>  
    </ScrollView>
    
  )

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30
  },
  label: {
    fontSize: 16,
    color: theme.colours.gray5,
    marginBottom: theme.spacing.spacing1,
    alignItems: 'flex-start'
  },
  text: {
    lineHeight: 18,
    marginBottom: theme.spacing.spacing1,
  },
  inputContainer: {
    backgroundColor: theme.colours.gray0,
    marginTop: theme.spacing.spacing6,
    padding: theme.spacing.spacing3,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.colours.gray2
  }
})

export default EditProfile
import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Avatar, Text, Divider } from 'react-native-elements'
import { AuthContext } from '../../../../navigation/AuthProvider'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import ScreenView from '../../../../components/atoms/ScreenView'
import PrimaryButton from '../../../../components/atoms/PrimaryButton'
import theme from '../../../../styles/theme'

function index({ navigation }) {

  const [childName, setChildName] = useState('')
  const [age, setAge] = useState()
  const [gender, setGender] = useState('')
  const [location, setLocation] = useState()
  const [parentName, setParentName] = useState('')
  const [email, setEmail] = useState('')
  const [number ,setNumber] = useState('')
  const [photo, setPhoto] = useState()
  const [photoPresent, setPhotoPresent] = useState(false)

  const { logout } = useContext(AuthContext)

  const fetchData = async () => {
    const doc = await firestore().collection('Clients').doc(auth().currentUser.uid).get()
    const data = doc.data()
    return data
  }

  const getAge = (seconds) => {
    const dobMS = seconds * 1000
    const age = new Date() - dobMS
    return Math.floor(age / (1000 * 60 * 60 * 24 * 365))
  }

  useEffect(() => {
    fetchData().then((data) => {
      setChildName(data.childName)
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

  return (
    <ScreenView style = {styles.container}>
      <Text h2Style = {styles.header} h2>Your Profile</Text>
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
      <Text h3>{childName}</Text>
      <Text>{age} years old</Text>
      {
        gender.length != 0 && (
          <Text>{gender}</Text>
        )
      }
      <Text>{location}</Text>
      <Divider style = {styles.divider} />
      <Text style = {styles.label}>Your particulars</Text>
      <Text style = {styles.text}>{parentName}</Text>
      <Text style = {styles.text}>Your email: {email}</Text>
      <Text style = {styles.text}>Your number: {number}</Text>

      <View style={styles.rowView}>

      <PrimaryButton
        title = "Edit Profile"
        onPress = {() => {
          navigation.navigate('EditProfileScreen')
        }}
        containerStyle = {styles.logoutButtonContainer}
        buttonStyle = {styles.logoutButton}
      />

      <PrimaryButton
        title = "Log Out"
        onPress = {() => logout()}
        containerStyle = {styles.logoutButtonContainer}
        buttonStyle = {styles.logoutButton}
      />

      </View>

    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colours.gray1,
    padding: theme.spacing.spacing3
  },
  header: {
    marginBottom: theme.spacing.spacing2
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: theme.colours.gray2,
    marginBottom: 15
  },
  image: {
    alignSelf: 'center',
    width: 220,
    height: 220,
    marginBottom: 15
  },
  divider: {
    height: 2,
    backgroundColor: theme.colours.gray2,
    marginHorizontal: theme.spacing.spacing5,
    marginTop: theme.spacing.spacing2,
    marginBottom: theme.spacing.spacing4
  },
  label: {
    fontSize: 16,
    color: theme.colours.gray5,
    marginBottom: theme.spacing.spacing1
  },
  text: {
    lineHeight: 18,
    marginBottom: theme.spacing.spacing1
  },
  logoutButtonContainer: {
    marginTop: theme.spacing.spacing4,
    alignSelf: 'center'
  },
  logoutButton: {
    backgroundColor: theme.colours.primary
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})

export default index

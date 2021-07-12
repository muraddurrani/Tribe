import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import { AuthContext } from '../../../../navigation/AuthProvider'
import ScreenView from '../../../../components/views/ScreenView'
import Header from '../../../../components/molecules/Header'
import ProfileIcon from '../../../../components/molecules/ProfileIcon'
import Tile from './Tile'

function index({ navigation }) {
  const { userData } = useContext(AuthContext)

  return (
    <ScreenView style = {styles.container}>
      <Header icon title = "Edit Profile" onPress =  {() => navigation.goBack()}/>
      <Tile
        style = {styles.tile}
        label = "Profile Photo"
        onPress = {() => navigation.navigate('EditProfile3')}
      >
        <ProfileIcon
          size = {60}
          style = {styles.profile}
          photo = {userData.profilePhoto}
        />
      </Tile>

      <Tile
        style = {styles.tile}
        label = "My Child"
        onPress = {() => navigation.navigate('EditProfile2')}
      >
        <View style = {{flexDirection: 'row'}}>
          <View style = {styles.labelView}>
            <Text h4>Name</Text>
            <Text h4>D.O.B</Text>
            {userData.childGender.length !=0 && <Text h4>Gender</Text>}
          </View>
          <View>
            <Text>{userData.childFullName}</Text>
            <Text>{new Date(userData.childDOB.seconds * 1000).toDateString().substring(4)}</Text>
            {userData.childGender.length !=0 && <Text>{userData.childGender}</Text>}
          </View>
        </View>
      </Tile>

      <Tile
        style = {styles.tile}
        label = "My Particulars"
        onPress = {() => navigation.navigate('EditProfile1')}
      >
        <View style = {{flexDirection: 'row'}}>
          <View style = {styles.labelView}>
            <Text h4>Name</Text>
            <Text h4>Location</Text>
            <Text h4>Number</Text>
          </View>
          <View>
            <Text>{userData.parentFullName}</Text>
            <Text>{userData.location}</Text>
            <Text>{userData.phoneNumber}</Text>
          </View>
        </View>
      </Tile>

    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  tile: {
    marginTop: 20
  },
  profile: {
    alignSelf: 'center'
  },
  labelView: {
    width: 80,
  },
})

export default index

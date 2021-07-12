import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import { mapObjectToSentence } from '../../../../utilities/helper'
import { AuthContext } from '../../../../navigation/AuthProvider'
import ScrollScreenView from '../../../../components/views/ScrollScreenView'
import Header from '../../../../components/molecules/Header'
import ProfileIcon from '../../../../components/molecules/ProfileIcon'
import Tile from './Tile'

function index({ navigation }) {
  const { userData } = useContext(AuthContext)
  const [serviceInfo, setServiceInfo] = useState({})
  const [availabilityInfo, setAvailabilityInfo] = useState({})

  useEffect(() => {
    setServiceInfo({'0': userData.Responses[0], '1': userData.Responses[1], '5': userData.Responses[5], '6': userData.Responses[6]})
    setAvailabilityInfo({'2': userData.Responses[2], '3': userData.Responses[3], '4': userData.Responses[4]})
  }, [])

  return (
    <ScrollScreenView contentContainerStyle = {styles.container}>
      <Header icon title = "Edit Profile" onPress =  {() => navigation.goBack()}/>
      <Tile
        style = {styles.tile}
        label = "Profile Photo"
        onPress = {() => navigation.navigate('EditProfile10')}
      >
        <ProfileIcon
          size = {60}
          style = {styles.profile}
          photo = {userData.profilePhoto}
        />
      </Tile>

      <Tile
        style = {styles.tile}
        label = "Particulars"
        onPress = {() => navigation.navigate('EditProfile1')}
      >
        <View style = {{flexDirection: 'row'}}>
          <View style = {styles.labelView}>
            <Text h4>Name</Text>
            <Text h4>Number</Text>
          </View>
          <View>
            <Text>{userData.fullName}</Text>
            <Text>{userData.phoneNumber}</Text>
          </View>
        </View>
      </Tile>

      <Tile
        style = {styles.tile}
        label = "Description"
        onPress = {() => navigation.navigate('EditProfile9')}
      >
        <Text>{userData.serviceDescription}</Text>
      </Tile>

      <Tile
        style = {styles.tile}
        label = "My Service"
        onPress = {() => navigation.navigate('EditProfile2')}
      >
        {Object.values(serviceInfo).map((value, index) => (
              <Text style = {styles.bodyText} key = {index}>{mapObjectToSentence(value)}</Text>
            ))}
      </Tile>

      <Tile
        style = {styles.tile}
        label = "My Availability"
        onPress = {() => navigation.navigate('EditProfile4')}
      >
        {Object.values(availabilityInfo).map((value, index) => (
              <Text style = {styles.bodyText} key = {index}>{mapObjectToSentence(value)}</Text>
            ))}
      </Tile>

    </ScrollScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 20
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
  bodyText: {
    marginBottom: 5
  }
})

export default index

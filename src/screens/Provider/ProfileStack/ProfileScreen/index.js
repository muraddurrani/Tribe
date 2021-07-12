import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, Text } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { AuthContext } from '../../../../navigation/AuthProvider'
import { mapObjectToSentence } from '../../../../utilities/helper'

import ScrollScreenView from '../../../../components/views/ScrollScreenView'
import ProfilePicture from '../../../../components/molecules/ProfilePicture'
import TertiaryButton from '../../../../components/buttons/TertiaryButton'
import colours from '../../../../styles/colours'

function index({ navigation }) {
  const { userData } = useContext(AuthContext)
  const [serviceInfo, setServiceInfo] = useState({})
  const [availabilityInfo, setAvailabilityInfo] = useState({})

  useEffect(() => {
    setServiceInfo({'0': userData.Responses[0], '1': userData.Responses[1], '5': userData.Responses[5], '6': userData.Responses[6]})
    setAvailabilityInfo({'2': userData.Responses[2], '3': userData.Responses[3], '4': userData.Responses[4]})
  }, [userData])

  return (
    <ScrollScreenView>
      <ProfilePicture photo = {userData.profilePhoto} />
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors = {[colours.primary, colours.secondary]} style = {styles.featureView}>
        <Text h4Style = {styles.featureHeader} h4>{userData.fullName}</Text>
        <View style = {styles.rowView}>
          <Icon name = "mail" size = {16} color = {colours.gray0} containerStyle = {styles.featureIcon}/>
          <Text style = {styles.featureText}>{userData.email}</Text>
        </View>
        <View style = {styles.rowView}>
          <Icon name = "phone" size = {16} color = {colours.gray0} containerStyle = {styles.featureIcon}/>
          <Text style = {styles.featureText}>{userData.phoneNumber}</Text>
        </View>
      </LinearGradient>
      <View style = {styles.body}>
        <TertiaryButton
          title = "Edit Profile"
          style = {styles.editButton}
          onPress = {() => navigation.navigate('EditProfile')}
        />
        <View style = {styles.tile}>
          <Icon name = "align-left" color = {colours.gray7} size = {30} containerStyle = {styles.icon}/>
          <View>
            <Text style = {styles.bodyHeader}>Description</Text>
            <Text style = {styles.bodyText}>{userData.serviceDescription}</Text>
          </View>
        </View>

        <View style = {styles.tile}>
          <Icon name = "file-text" color = {colours.gray7} size = {30} containerStyle = {styles.icon}/>
          <View>
            <Text style = {styles.bodyHeader}>My Service</Text>
            {Object.values(serviceInfo).map((value, index) => (
              <Text style = {styles.bodyText} key = {index}>{mapObjectToSentence(value)}</Text>
            ))}
          </View>
        </View>

        <View style = {styles.tile}>
          <Icon name = "watch" color = {colours.gray7} size = {30} containerStyle = {styles.icon}/>
          <View>
            <Text style = {styles.bodyHeader}>My Availability</Text>
            {Object.values(availabilityInfo).map((value, index) => (
              <Text style = {styles.bodyText} key = {index}>{mapObjectToSentence(value)}</Text>
            ))}
          </View>
        </View>
      </View>
    </ScrollScreenView>
  )
}

const styles = StyleSheet.create({
  featureView: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 280,
    borderRadius: 5,
    position: 'absolute',
    alignSelf: 'center',
    top: 215
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  featureHeader: {
    fontSize: 16,
    color: colours.gray0,
    marginBottom: 5
  },
  featureText: {
    color: colours.gray0
  },
  featureIcon: {
    marginRight: 10
  },
  body: {
    marginTop: 60,
    paddingHorizontal: '5%',
    paddingVertical: 20
  },
  editButton: {
    alignSelf: 'flex-end'
  },
  tile: {
    backgroundColor: colours.gray0,
    elevation: 3,
    borderRadius: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  icon: {
    marginHorizontal: 40
  },
  bodyHeader: {
    fontSize: 16,
    marginBottom: 5
  },
  labelView: {
    width: 70,
  },
  bodyText: {
    width: 230,
    marginBottom: 5
  }
})

export default index

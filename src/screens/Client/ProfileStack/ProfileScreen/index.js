import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, Text } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { AuthContext } from '../../../../navigation/AuthProvider'
import { getAge } from '../../../../utilities/helper'

import ScrollScreenView from '../../../../components/views/ScrollScreenView'
import ProfilePicture from '../../../../components/molecules/ProfilePicture'
import TertiaryButton from '../../../../components/buttons/TertiaryButton'
import colours from '../../../../styles/colours'

function index({ navigation }) {
  const { userData } = useContext(AuthContext)

  return (
    <ScrollScreenView>
      <ProfilePicture photo = {userData.profilePhoto} />
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors = {[colours.primary, colours.secondary]} style = {styles.featureView}>
        <Text h4Style = {styles.featureHeader} h4>{userData.childFullName}</Text>
        <View style = {styles.rowView}>
          <Icon name = "birthday-cake" type = "font-awesome" size = {16} color = {colours.gray0} containerStyle = {styles.featureIcon}/>
          <Text style = {styles.featureText}>{getAge(userData.childDOB.seconds)} years old</Text>
        </View>
        <View style = {styles.rowView}>
          <Icon name = "transgender" type = "font-awesome" size = {16} color = {colours.gray0} containerStyle = {styles.featureIcon}/>
          {userData.childGender.length !=0 && <Text style = {styles.featureText}>{userData.childGender}</Text>}
        </View>
      </LinearGradient>
      <View style = {styles.body}>
        <TertiaryButton
          title = "Edit Profile"
          style = {styles.editButton}
          onPress = {() => navigation.navigate('EditProfile')}
        />
        <View style = {styles.tile}>
          <Icon name = "child" type = "font-awesome" color = {colours.gray7} size = {30} containerStyle = {styles.icon}/>
          <View>
            <Text style = {styles.bodyHeader}>My Child</Text>
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
          </View>
        </View>

        <View style = {styles.tile}>
          <Icon name = "id-badge" type = "font-awesome" color = {colours.gray7} size = {30} containerStyle = {styles.icon}/>
          <View>
            <Text style = {styles.bodyHeader}>My Particulars</Text>
            <View style = {{flexDirection: 'row'}}>
              <View style = {styles.labelView}>
                <Text h4>Name</Text>
                <Text h4>Location</Text>
                <Text h4>Email</Text>
                <Text h4>Number</Text>
              </View>
              <View>
                <Text>{userData.parentFullName}</Text>
                <Text>{userData.location}</Text>
                <Text>{userData.email}</Text>
                <Text>{userData.phoneNumber}</Text>
              </View>
            </View>
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
    width: 300,
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
    width: 80,
  },
})

export default index

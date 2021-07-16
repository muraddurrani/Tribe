import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import ProfileIcon from '../../../components/molecules/ProfileIcon'
import colours from '../../../styles/colours'

function ProfileTile({photo, name}) {
  return (
    <View style = {styles.rowView}>
      <ProfileIcon style = {styles.profile} photo = {photo} size = {60} />
      <Text h2Style = {styles.text} h2>Hi, {name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  profile: {
    borderWidth: 2,
    borderColor: colours.gray0,
    marginRight: 30
  },
  text: {
    color: colours.gray0,
    marginRight: 30
  }
})

export default ProfileTile

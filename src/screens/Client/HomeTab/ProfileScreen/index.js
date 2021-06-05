import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Avatar, Button, Text, Divider } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import { AuthContext } from '../../../../navigation/AuthProvider'

function index({ navigation }) {

  const { logout } = useContext(AuthContext)
  
  return (
    <View>
      <Text>Your Profile</Text>
      <Button title = "Log Out" onPress = {() => logout()}/>
    </View>
  )
}

export default index

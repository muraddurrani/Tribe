import React, { useLayoutEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import ProfileScreen from '../../screens/Client/ProfileStack/ProfileScreen/index'
import EditProfileScreen from '../../screens/Client/ProfileStack/EditProfileScreen/index'
import EditProfile1 from '../../screens/Client/ProfileStack/EditProfile1/index'
import EditProfile2 from '../../screens/Client/ProfileStack/EditProfile2/index'
import EditProfile3 from '../../screens/Client/ProfileStack/EditProfile3/index'

const Stack = createStackNavigator()

function ProfileStack({ navigation, route }) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
    if (routeName && routeName != "Profile") {
      navigation.setOptions({tabBarVisible: false})
    } else {
      navigation.setOptions({tabBarVisible: true})
    }
  }, [navigation, route])

  return (
    <Stack.Navigator initialRouteName = "Profile" screenOptions = {{headerShown: false}}>
      <Stack.Screen name = "Profile" component = {ProfileScreen} />
      <Stack.Screen name = "EditProfile" component = {EditProfileScreen} />
      <Stack.Screen name = "EditProfile1" component = {EditProfile1} />
      <Stack.Screen name = "EditProfile2" component = {EditProfile2} />
      <Stack.Screen name = "EditProfile3" component = {EditProfile3} />
    </Stack.Navigator>
  )
}

export default ProfileStack

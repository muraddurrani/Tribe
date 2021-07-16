import React, { useLayoutEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import ProfileScreen from '../../screens/Provider/ProfileStack/ProfileScreen/index'
import EditProfileScreen from '../../screens/Provider/ProfileStack/EditProfileScreen/index'
import EditProfile1 from '../../screens/Provider/ProfileStack/EditProfile1/index'
import EditProfile2 from '../../screens/Provider/ProfileStack/EditProfile2/index'
import EditProfile3 from '../../screens/Provider/ProfileStack/EditProfile3/index'
import EditProfile4 from '../../screens/Provider/ProfileStack/EditProfile4/index'
import EditProfile5 from '../../screens/Provider/ProfileStack/EditProfile5/index'
import EditProfile6 from '../../screens/Provider/ProfileStack/EditProfile6/index'
import EditProfile7 from '../../screens/Provider/ProfileStack/EditProfile7/index'
import EditProfile8 from '../../screens/Provider/ProfileStack/EditProfile8/index'
import EditProfile9 from '../../screens/Provider/ProfileStack/EditProfile9/index'
import EditProfile10 from '../../screens/Provider/ProfileStack/EditProfile10/index'

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
      <Stack.Screen name = "EditProfile" component = {EditProfileScreen}/>
      <Stack.Screen name = "EditProfile1" component = {EditProfile1} />
      <Stack.Screen name = "EditProfile2" component = {EditProfile2} />
      <Stack.Screen name = "EditProfile3" component = {EditProfile3} />
      <Stack.Screen name = "EditProfile4" component = {EditProfile4} />
      <Stack.Screen name = "EditProfile5" component = {EditProfile5} />
      <Stack.Screen name = "EditProfile6" component = {EditProfile6} />
      <Stack.Screen name = "EditProfile7" component = {EditProfile7} />
      <Stack.Screen name = "EditProfile8" component = {EditProfile8} />
      <Stack.Screen name = "EditProfile9" component = {EditProfile9} />
      <Stack.Screen name = "EditProfile10" component = {EditProfile10} />
    </Stack.Navigator>
  )
}

export default ProfileStack

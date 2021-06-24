import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CreateProfile1 from '../../screens/Client/CreateClientProfileStack/CreateProfile1/index';
import CreateProfile2 from '../../screens/Client/CreateClientProfileStack/CreateProfile2/index';
import CreateProfile3 from '../../screens/Client/CreateClientProfileStack/CreateProfile3/index';
import IncompleteProfileScreen from '../../screens/Client/CreateClientProfileStack/IncompleteProfileScreen/index';
import ClientHomeTab from './ClientHomeTab';

const Stack = createStackNavigator();

function CreateClientProfileStack(routes) {
  return (
    <Stack.Navigator
      initialRouteName={routes.initialRouteName}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="CP1" component={CreateProfile1} />
      <Stack.Screen name="CP2" component={CreateProfile2} />
      <Stack.Screen name="CP3" component={CreateProfile3} />
      <Stack.Screen name="Home" component={ClientHomeTab} />
      <Stack.Screen
        name="IncompleteProfile"
        component={IncompleteProfileScreen}
      />
    </Stack.Navigator>
  );
}

export default CreateClientProfileStack;

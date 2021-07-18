import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

import Switcher from './Switcher'
import Header from '../../../../components/molecules/Header'
import ScreenView from '../../../../components/views/ScreenView'
import Appointments from './Appointments/Appointments'
import Pending from './Pending/Pending'
import Requests from './Requests/Requests'
import colours from '../../../../styles/colours'

function index({navigation}) {
  const [index, setIndex] = useState(0)

  return (
    <ScreenView style = {styles.container}>
      <Header title = "Appointments" />
      <Switcher index = {index} onPress = {index => setIndex(index)} style = {styles.switcher}/>
      <View style = {{flex: 1, paddingHorizontal: '5%'}}>
        {index == 0 ? <Appointments /> : index == 1 ? <Pending /> : <Requests />}
      </View>
      <Icon name = "plus" containerStyle = {styles.plusIcon} color = {colours.gray0} onPress = {() => navigation.navigate('CA1')}/>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  switcher: {
    marginTop: 10,
    marginBottom: 30
  },
  plusIcon: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    backgroundColor: colours.midpoint2,
    borderRadius: 24,
    padding: 10
  }
})

export default index

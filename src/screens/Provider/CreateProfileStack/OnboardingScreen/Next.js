import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon } from 'react-native-elements'
import colours from '../../../../styles/colours'
import { useNavigation } from '@react-navigation/native'

import PrimaryButton from '../../../../components/buttons/PrimaryButton'

function Appointments() {
  const navigation = useNavigation()
  
  return (
    <View style = {styles.container}>
      <View style = {styles.graphic}>
        <Icon name = 'check' color = {colours.primary} size = {70} containerStyle = {styles.icon}/>
        <Text h3Style = {styles.header} h3>That's all!</Text>
        <PrimaryButton title = "Start using Tribe" containerStyle = {styles.button} buttonStyle = {styles.button} onPress = {() => navigation.navigate('Home')}  />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40
  },
  graphic: {
    alignSelf: 'center',
    alignItems: 'center'
  },
  icon: {
    borderColor: colours.primary,
    borderWidth: 5,
    padding: 20,
    borderRadius: 60,
    marginBottom: 5
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 50
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
    textAlign: 'left'
  },
  button: {
    width: 180
  }
})

export default Appointments

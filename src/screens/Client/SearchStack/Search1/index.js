import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, Text } from 'react-native-elements'

import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import GradientView from '../../../../components/views/GradientView'

import colours from '../../../../styles/colours'

function index({ navigation }) {
  return (
    <GradientView style = {styles.container}>
      <View style = {styles.iconContainer}>
        <Icon name = 'search' size = {120} color = {'rgba(255, 255, 255, 0.9)'} containerStyle = {styles.icon}/>
      </View>
      <Text h1>Looking for a service?</Text>
      <Text style = {styles.text}>Answer a few short questions and choose from a selection of professionals best suited to your needs!</Text>
      <PrimaryButton
        title = "Begin Search"
        containerStyle = {styles.button}
        buttonStyle = {styles.button}
        titleStyle = {{color: colours.midpoint1}}
        onPress = {() => navigation.navigate('Search2')}
      />
    </GradientView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 30
  },
  iconContainer: {
    padding: 30,
    backgroundColor: 'rgba(255, 180, 125, 0.6)',
    width: 220,
    borderRadius: 110,
    marginTop: '25%',
    marginBottom: 40
  },
  icon: {
    padding: 20,
    width: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 205, 169, 0.6)'
  },
  text: {
    color: colours.gray0,
    marginTop: 15,
    marginBottom: 50
  },
  button: {
    width: 160,
    backgroundColor: colours.gray0
  }
})

export default index
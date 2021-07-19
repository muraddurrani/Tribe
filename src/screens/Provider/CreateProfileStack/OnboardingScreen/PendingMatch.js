import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon } from 'react-native-elements'
import colours from '../../../../styles/colours'

function PendingMatch() {
  return (
    <View style = {styles.container}>
      <View style = {styles.graphic}>
        <Icon name = 'puzzle-outline' type = 'material-community'  color = {colours.primary} size = {70} containerStyle = {styles.icon}/>
        <Text h3Style = {styles.header} h3>Pending Matches</Text>
      </View>
      <Text style = {styles.text}>When a parent chooses to request a match with you, it will appear on the Pending Matches page.</Text>
      <Text style = {styles.text}>Here you can view more details about what they are looking for and decide whether or not to match back.</Text>
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
  }
})

export default PendingMatch

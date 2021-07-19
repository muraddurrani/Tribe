import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon } from 'react-native-elements'
import colours from '../../../../styles/colours'

function Search() {
  return (
    <View style = {styles.container}>
      <View style = {styles.graphic}>
        <Icon name = 'search'  color = {colours.primary} size = {70} containerStyle = {styles.icon}/>
        <Text h3Style = {styles.header} h3>Search</Text>
      </View>
      <Text style = {styles.text}>The Search page is your place to find professionals.</Text>
      <Text style = {styles.text}>Respond to a short set of questions and Tribe will recommend the most suitable professionals for your needs.</Text>
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

export default Search

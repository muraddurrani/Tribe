import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Text, CheckBox } from 'react-native-elements'
import ScreenView from '../../../../components/atoms/ScreenView'
import PrimaryButton from '../../../../components/atoms/PrimaryButton'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import _ from 'lodash'
import theme from '../../../../styles/theme'

function index({ navigation, route }) {

  let query = route.params

  const [choice, setChoice] = useState({})
  const [checked, setChecked] = useState()
  const data = [{id: 0, name: 'Just once'},
                {id: 1, name: 'Once a week'},
                {id: 2, name: 'Once every two weeks'},
                {id: 3, name: 'Once a month or less'},
                {id: 4, name: 'I have not decided'}]

  const handleCheck = (item) => {
    setChecked(item.id)
    setChoice({...{[item.id]: item.name}})
  }

  const render = ({item}) => (
    <CheckBox
      containerStyle = {styles.checkbox}
      title = {item.name}
      checked = {checked == item.id}
      checkedColor = {theme.colours.primary}
      onPress = {() => handleCheck(item)}
      />
  )

  const submit = async () => {
    query.push(choice)
    console.log(query)
    navigation.navigate('SearchResult', query)
  }

  return (
    <ScreenView style = {styles.container}>
      <Text h1Style = {styles.header} h1>Find a service</Text>
      <Text h4>How frequently do you want the service?</Text>
      <Text>(Select all that apply)</Text>
      <View style = {styles.listView}>
        <FlatList
          data = {data}
          renderItem = {render}
          keyExtractor = {item => item.id}
        />
      </View>
      <PrimaryButton
        title = "Next"
        disabled = {Object.keys(choice).length === 0}
        onPress = {() => {
          submit()
        }}
        containerStyle = {styles.nextButton}
      />
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colours.gray1,
    alignItems: 'center'
  },
  header: {
    marginVertical: theme.spacing.spacing6
  },
  listView: {
    marginTop: 20,
    borderRadius: 10,
    width: 340,
    height: 320,
    padding: theme.spacing.spacing1,
    backgroundColor: theme.colours.gray0,
    borderColor: theme.colours.gray2,
    borderWidth: 1
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderBottomColor: theme.colours.gray1,
    borderWidth: 2
  },
  nextButton: {
    marginTop: 30
  }
})

export default index

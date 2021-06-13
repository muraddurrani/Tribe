import React, { useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Button, CheckBox, Text } from 'react-native-elements'
import SearchBar from '../../../../components/atoms/SearchBar'
import serviceList from './serviceList'
import _ from 'lodash'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

function index({ navigation }) {
  const [choices, setChoices] = useState([])
  const [checked, setChecked] = useState(new Array(serviceList.length).fill(false))
  const [data, setData] = useState(serviceList)
  const masterData = serviceList.map(dataMapper)

  function dataMapper(item) {
    return {
      id: item.id,
      name: item.name.toLowerCase()
    }
  }

  const handleCheck = (i, name) => {
    var isSelected = !checked[i]
    setChecked(checked.map((bool, index) => index == i ? !bool : bool))

    if (isSelected) {
      choices.push(name)
    } else {
      choices.splice(choices.indexOf(name), 1)
    }
  }

  const render = ({item}) => (
      <CheckBox
        containerStyle = {styles.checkBox}
        title = {item.name}
        textStyle = {styles.checkText}
        checked = {checked[item.id]}
        onPress = {() => handleCheck(item.id, item.name)}
        />
    )

  function filterSearch(text) {
    text = text.toLowerCase()
    const filteredList = _.filter(serviceList, item => masterData[item.id].name.includes(text))
    setData(filteredList)
  }

  const handleNext = () => {
    firestore().collection('Clients').doc(auth().currentUser.uid).update({services: choices})
    navigation.navigate('HomeTab')
  }

  return (
    <View style = {styles.container}>
      <Text h1>Create your profile</Text>
      <Text style = {styles.text}>What types of services are you interested in?</Text>
      <SearchBar onChangeText = {filterSearch} />
      <View style = {styles.checkContainer}>
      <FlatList
        data = {data}
        renderItem = {render}
        keyExtractor = {item => item.id}
      />
      </View>
      <Button containerStyle = {styles.nextButton} title = "Next" onPress = {() => handleNext()}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20
  },
  nextButton: {
    marginTop: 30
  },
  checkContainer: {
    width: '90%',
    height: 270,
    paddingTop: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10
  },
  checkBox: {
    marginVertical: 0,
    backgroundColor: 'transparent',
    borderColor: 'transparent'
  },
  checkText: {
    fontWeight: 'normal'
  }
})

export default index

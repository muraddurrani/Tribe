import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Text, CheckBox } from 'react-native-elements'
import ScreenView from '../../../../components/atoms/ScreenView'
import PrimaryButton from '../../../../components/atoms/PrimaryButton'
import firestore from '@react-native-firebase/firestore'
import _ from 'lodash'
import theme from '../../../../styles/theme'

function index({ navigation, route}) {

  let query = route.params

  const [data, setData] = useState([])
  const [choices, setChoices] = useState({})
  const [checked, setChecked] = useState([])
  
  const fetchData = async () => {
    const dataDoc = await firestore().collection('ProviderAttributes').doc('4').get()
    const dataMap = dataDoc.get('AnswerSet')
    return Object.keys(dataMap).map(key => {
      return {id: key, name: dataMap[key]}
    })
  }

  const handleCheck = (item) => {
    if (_.has(choices, item.id)) {
      const {[item.id]: deleted, ...rest} = choices
      setChoices(rest)
    } else {
      setChoices({...choices, ...{[item.id]: item.name}})
    }
    setChecked(checked.map((bool, index) => index == item.id ? !bool : bool))
  }

  const render = ({item}) => (
    <CheckBox
      containerStyle = {styles.checkbox}
      title = {item.name}
      checked = {checked[item.id]}
      checkedColor = {theme.colours.primary}
      onPress = {() => handleCheck(item)}
      />
  )

  const submit = async () => {
    query.push(choices)
    console.log(query)
    navigation.navigate('Search5', query)
  }

  useEffect(() => {
    fetchData().then((data) => {
      setChecked(new Array(data.length).fill(false))
      setData(data)
    })
  }, [])

  return (
    <ScreenView style = {styles.container}>
      <Text h1Style = {styles.header} h1>Find a service</Text>
      <Text h4>At which times are you available?</Text>
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
        disabled = {Object.keys(choices).length === 0}
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
    height: 190,
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

import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, StyleSheet, View, Keyboard } from 'react-native'
import { Text, Input, Icon, CheckBox } from 'react-native-elements'
import ScreenView from '../../../../components/atoms/ScreenView'
import PrimaryButton from '../../../../components/atoms/PrimaryButton'
import firestore from '@react-native-firebase/firestore'
import { useFocusEffect } from '@react-navigation/native'
import _ from 'lodash'
import theme from '../../../../styles/theme'

function index({ navigation }) {

  const [masterData, setMasterData] = useState([])
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [choice, setChoice] = useState(null)
  const [checked, setChecked] = useState([])

  let query = []

  const fetchData = async () => {
    const dataDoc = await firestore().collection('ProviderAttributes').doc('0').get()
    const dataMap = dataDoc.get('AnswerSet')
    return Object.keys(dataMap).map(key => {
      return {id: key, name: dataMap[key]}
    })
  }

  const handleCheck = (item) => {
    setChecked(item.id)
    setChoice(item.id)
  }

  const filterSearch = (text) => {
    const value = text.toLowerCase()
    const filtered = _.filter(masterData, item => item.name.includes(value))
    setData(filtered)
    setSearch(text)
  }

  const submit = () => {
    query.push(choice)
    console.log(query)
    navigation.navigate('Search1', query)
  }

  const render = ({item}) => (
    <CheckBox
      containerStyle = {styles.checkbox}
      title = {item.name[0].toUpperCase() + item.name.substring(1)}
      checked = {checked == item.id}
      checkedColor = {theme.colours.primary}
      onPress = {() => {
        handleCheck(item)
      }}
      />
  )

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSearch('')
        setChoice(null)
        setChecked([])
      }
    }, [])
  )

  useEffect(() => {
    fetchData().then((data) => {
      setData(data)
      setMasterData(data)
    })
  }, [])

  return (
    <ScreenView style = {styles.container}>
      <Text h1Style = {styles.header} h1>Find a service</Text>
      <Text h4>Which type of service are you looking for?</Text>
      <View style = {styles.listView}>
        <Input
          value = {search}
          placeholder = "Search..."
          onChangeText = {(text) => filterSearch(text)} 
          leftIcon = {<Icon name = "search"/>}
          rightIcon = {<Icon name = "x" onPress = {() => {
            Keyboard.dismiss()
            filterSearch('')
          }}/>}
        />
        <FlatList
          data = {data}
          renderItem = {render}
          keyExtractor = {item => item.id}
        />
      </View>
      <PrimaryButton
        title = "Next"
        disabled = {choice == null}
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
    marginTop: 38,
    borderRadius: 10,
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

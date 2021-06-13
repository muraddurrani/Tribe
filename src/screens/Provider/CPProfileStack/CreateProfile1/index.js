import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View, Keyboard } from 'react-native'
import { Text, Input, Icon, CheckBox } from 'react-native-elements'
import ScreenView from '../../../../components/atoms/ScreenView'
import PrimaryButton from '../../../../components/atoms/PrimaryButton'
import Header from '../../../../components/atoms/Header'
import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import _ from 'lodash'
import theme from '../../../../styles/theme'

function index({ navigation }) {

  const [masterData, setMasterData] = useState([])
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [choices, setChoices] = useState({})
  const [checked, setChecked] = useState([])
  
  const fetchData = async () => {
    const dataDoc = await firestore().collection('ProviderAttributes').doc('0').get()
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

  const filterSearch = (text) => {
    const value = text.toLowerCase()
    const filtered = _.filter(masterData, item => item.name.includes(value))
    setData(filtered)
    setSearch(text)
  }

  const render = ({item}) => (
    <CheckBox
      containerStyle = {styles.checkbox}
      title = {item.name[0].toUpperCase() + item.name.substring(1)}
      checked = {checked[item.id]}
      checkedColor = {theme.colours.primary}
      onPress = {() => {
        handleCheck(item)
      }}
      />
  )

  const submitChoices = () => {
    const ansCollection = firestore().collection('SearchProviders').doc('0').collection('Answers')
    for (const choice in choices) {
      ansCollection.doc(choice).update({IDs: firebase.firestore.FieldValue.arrayUnion(auth().currentUser.uid)})
    }
    firestore().collection('Providers').doc(auth().currentUser.uid).update({ 'Responses.0': {...choices} } )
  }

  useEffect(() => {
    fetchData().then((data) => {
      setData(data)
      setMasterData(data)
      setChecked(new Array(data.length).fill(false))
    })
  }, [])

  return (
    <ScreenView style = {styles.container}>
      <Header>Create your profile</Header>
      <ScreenView style = {styles.card}>
        <Text style = {styles.description} h4>Which of the following best describes your service?</Text>
        <Text>(Select all that apply)</Text>
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
          disabled = {Object.keys(choices).length === 0}
          onPress = {() => {
            submitChoices()
            navigation.navigate('CP2')
          }}
          containerStyle = {styles.nextButton}
        />
      </ScreenView>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colours.primary
  },
  card: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    backgroundColor: theme.colours.gray1
  },
  listView: {
    marginTop: 20,
    borderRadius: 10,
    height: 360,
    padding: theme.spacing.spacing1,
    backgroundColor: theme.colours.gray0,
    borderColor: theme.colours.gray2,
    borderWidth: 1
  },
  description: {
    marginTop: 35
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

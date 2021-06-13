import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Text, CheckBox } from 'react-native-elements'
import ScreenView from '../../../../components/atoms/ScreenView'
import PrimaryButton from '../../../../components/atoms/PrimaryButton'
import Header from '../../../../components/atoms/Header'
import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import _ from 'lodash'
import theme from '../../../../styles/theme'

function index({ navigation }) {

  const [data, setData] = useState([])
  const [choices, setChoices] = useState({})
  const [checked, setChecked] = useState([])
  
  const fetchData = async () => {
    const dataDoc = await firestore().collection('ProviderAttributes').doc('3').get()
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

  const submitChoices = () => {
    const ansCollection = firestore().collection('SearchProviders').doc('3').collection('Answers')
    for (const choice in choices) {
      ansCollection.doc(choice).update({IDs: firebase.firestore.FieldValue.arrayUnion(auth().currentUser.uid)})
    }
    firestore().collection('Providers').doc(auth().currentUser.uid).update({ 'Responses.3': {...choices} } )
  }

  useEffect(() => {
    fetchData().then((data) => {
      setChecked(new Array(data.length).fill(false))
      setData(data)
    })
  }, [])

  return (
    <ScreenView style = {styles.container}>
      <Header>Create your profile</Header>
      <ScreenView style = {styles.card}>
        <Text style = {styles.description} h4>On which days are you available?</Text>
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
          submitChoices()
          navigation.navigate('CP5')
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
    width: 340,
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

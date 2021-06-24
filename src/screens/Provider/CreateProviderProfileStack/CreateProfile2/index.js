import React, { useState, useEffect } from 'react'
import { Image, Keyboard, StyleSheet } from 'react-native'
import { Text, Input, Icon } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import _ from 'lodash'

import KeyboardGradientView from '../../../../components/views/KeyboardGradientView'
import MultiChoiceChecklist from '../../../../components/molecules/MultiChoiceChecklist'
import Card from '../../../../components/atoms/Card'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'

import { fetchProviderAttribute, updateSearchProviders } from '../../../../utilities/helper'

function index({ navigation }) {

  const [masterData, setMasterData] = useState([])
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [choices, setChoices] = useState({})

  const onCheck = (item) => {
    if (_.has(choices, item.id)) {
      const {[item.id]: deleted, ...rest} = choices
      setChoices(rest)
    } else {
      setChoices({...choices, ...{[item.id]: item.name}})
    }
  }

  const filterSearch = (text) => {
    const value = text.toLowerCase()
    const filtered = _.filter(masterData, item => item.name.includes(value))
    setData(filtered)
    setSearch(text)
  }

  const submit = () => {
    updateSearchProviders(choices, '0')
    firestore().collection('Providers').doc(auth().currentUser.uid).update({ 'Responses.0': {...choices} })
    navigation.navigate('CP3')
  }

  useEffect(() => {
    fetchProviderAttribute('0').then((data) => {
      setData(data)
      setMasterData(data)
    })
  }, [])

  return (
    <KeyboardGradientView style = {styles.container}>
      <Image source = {require('../../../../assets/images/Logo_Icon_White.png')} style = {styles.image} />
      <Text h1Style = {styles.header} h1>Create your profile</Text>
      <Card style = {styles.card}>
        <Text h4>Which of the following best describes your service?</Text>
        <Text>(Select all that apply)</Text>
        <Input
          containerStyle = {styles.searchBar}
          value = {search}
          placeholder = "Search..."
          onChangeText = {(text) => filterSearch(text)} 
          leftIcon = {<Icon name = "search"/>}
          rightIcon = {<Icon name = "x" onPress = {() => {
            Keyboard.dismiss()
            filterSearch('')
          }}/>}
        />
          <MultiChoiceChecklist
            height = {260}
            width = {'95%'}
            data = {data}
            onCheck = {onCheck}
          />
          <PrimaryButton
            title = "Next"
            disabled = {Object.keys(choices).length === 0}
            containerStyle = {styles.button}
            onPress = {() => submit()}
          />
      </Card>
    </KeyboardGradientView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  image: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 15,
    right: 20
  },
  header: {
    marginTop: '20%'
  },
  card: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 15,
    marginTop: 10,
    width: '95%',
    alignItems: 'center'
  },
  searchBar: {
    marginTop: 20,
    height: 60
  },
  button: {
    marginTop: 30
  }
})

export default index

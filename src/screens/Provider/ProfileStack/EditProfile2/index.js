import React, { useState, useEffect } from 'react'
import { Image, Keyboard, StyleSheet, View } from 'react-native'
import { Text, Input, Icon } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import _ from 'lodash'

import GradientView from '../../../../components/views/GradientView'
import colours from '../../../../styles/colours'
import MultiChoiceChecklist from '../../../../components/molecules/MultiChoiceChecklist'
import Card from '../../../../components/atoms/Card'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import { fetchProviderAttribute, fetchProviderResponse, updateSearchProviders, removeFromSearchProviders } from '../../../../utilities/helper'

function index({ navigation }) {
  const [masterData, setMasterData] = useState([])
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [choices, setChoices] = useState({})
  const [checked, setChecked] = useState([])

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
    navigation.navigate('EditProfile3')
  }

  useEffect(() => {
    fetchProviderAttribute('0').then((data) => {
      setData(data)
      setMasterData(data)

      fetchProviderResponse(0, auth().currentUser.uid).
        then(response => {
          setChecked(new Array(data.length).fill(false).map((item, index) => response[index]))
          setChoices(response)
          removeFromSearchProviders(response, '0')
        })
    })
  }, [])


  return (
    <GradientView style = {styles.container}>
      <Image source = {require('../../../../assets/images/Logo_Icon_White.png')} style = {styles.image}/>
      <Text h2Style = {styles.header} h2>Edit your profile</Text>
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
          checkArray = {checked}
          onCheck = {onCheck}
        />
        <View style = {styles.rowView}>
          <PrimaryButton
            title = "Next"
            disabled = {Object.keys(choices).length === 0}
            containerStyle = {styles.button}
            onPress = {() => submit()}
          />
        </View>
      </Card>
    </GradientView>
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
    right: 15
  },
  header: {
    marginTop: 100,
    color: colours.gray0
  },
  card: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    width: '90%',
    marginTop: 10
  },
  searchBar: {
    marginTop: 20,
    height: 60
  },
  rowView: {
    flexDirection: 'row',
    marginTop: 20
  },
  button: {
    marginHorizontal: 10
  }
})

export default index

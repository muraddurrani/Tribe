import React, { useState, useCallback } from 'react'
import { Image, Keyboard, StyleSheet } from 'react-native'
import { Text, Input, Icon } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'
import _ from 'lodash'

import { fetchProviderAttribute } from '../../../../utilities/helper'
import KeyboardGradientView from '../../../../components/views/KeyboardGradientView'
import SingleChoiceChecklist from '../../../../components/molecules/SingleChoiceChecklist'
import Card from '../../../../components/atoms/Card'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'


function index({ navigation }) {

  const [masterData, setMasterData] = useState([])
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [choice, setChoice] = useState(null)

  let query = []

  const onCheck = (item) => {
    setChoice({[item.id]: item.name})
  }

  const filterSearch = (text) => {
    const value = text.toLowerCase()
    const filtered = _.filter(masterData, item => item.name.includes(value))
    setData(filtered)
    setSearch(text)
  }

  const submit = () => {
    query.push(choice)
    navigation.navigate('Search3', query)
  }

  useFocusEffect(
    useCallback(() => {
      fetchProviderAttribute('0').then((data) => {
        setData(data)
        setMasterData(data)
      })

      return () => {
        setSearch('')
        setChoice(null)
      }
    }, [])
  )

  return (
    <KeyboardGradientView style = {styles.container}>
      <Image source = {require('../../../../assets/images/Logo_Icon_White.png')} style = {styles.image} />
      <Card style = {styles.card}>
        <Text h4>Which type of service are you looking for?</Text>
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
          <SingleChoiceChecklist
            height = {280}
            width = {'95%'}
            data = {data}
            onCheck = {onCheck}
          />
          <PrimaryButton
            title = "Next"
            disabled = {!choice}
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
  card: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 15,
    marginTop: '20%',
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

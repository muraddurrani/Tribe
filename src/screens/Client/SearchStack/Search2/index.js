import React, { useState, useEffect } from 'react'
import { Image, Keyboard, StyleSheet, View } from 'react-native'
import { Text, Input, Icon } from 'react-native-elements'
import _ from 'lodash'

import { fetchProviderAttribute } from '../../../../utilities/helper'
import GradientView from '../../../../components/views/GradientView'
import SingleChoiceChecklist from '../../../../components/molecules/SingleChoiceChecklist'
import Card from '../../../../components/atoms/Card'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import SecondaryButton from '../../../../components/buttons/SecondaryButton'
import colours from '../../../../styles/colours'


function index({ navigation }) {

  const [masterData, setMasterData] = useState([])
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [choice, setChoice] = useState(null)
  let query = {}

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
    query[0] = choice
    navigation.navigate('Search3', query)
  }

  useEffect(() => {
    fetchProviderAttribute('0').then((data) => {
      setData(data)
      setMasterData(data)
    })
  }, [])

  return (
    <GradientView style = {styles.container}>
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
          height = {310}
          width = {'95%'}
          data = {data}
          onCheck = {onCheck}
        />
        <View style = {styles.rowView}>
          <SecondaryButton
            title = "Back"
            containerStyle = {styles.button}
            onPress = {() => navigation.goBack()}
          />
          <PrimaryButton
            title = "Next"
            disabled = {!choice}
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
  card: {
    paddingTop: 40,
    paddingBottom: 20,
    marginTop: '20%',
    width: '90%',
    alignItems: 'center'
  },
  searchBar: {
    marginTop: 20,
    height: 60
  },
  button: {
    margin: 10
  },
  rowView: {
    flexDirection: 'row',
    marginTop: 20
  }
})

export default index

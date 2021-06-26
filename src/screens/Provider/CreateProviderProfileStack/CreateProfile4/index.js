import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { CheckBox, Text } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import _ from 'lodash'

import GradientScreenView from '../../../../components/views/GradientScreenView'
import MultiChoiceChecklist from '../../../../components/molecules/MultiChoiceChecklist'
import Card from '../../../../components/atoms/Card'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'

import colours from '../../../../styles/colours'

import { fetchProviderAttribute, updateSearchProviders } from '../../../../utilities/helper'

function index({ navigation }) {

  const [data, setData] = useState([])
  const [locationData, setLocationData] = useState([])
  const [choices, setChoices] = useState({})
  const [expand, setExpand] = useState(false)

  const onCheck = (item) => {
    if (_.has(choices, item.id)) {
      const {[item.id]: deleted, ...rest} = choices
      setChoices(rest)
    } else {
      setChoices({...choices, ...{[item.id]: item.name}})
    }
  }

  const submit = () => {
    updateSearchProviders(choices, '2')
    firestore().collection('Providers').doc(auth().currentUser.uid).update({ 'Responses.2': {...choices} } )
    navigation.navigate('CP5')
  }

  useEffect(() => {
    fetchProviderAttribute('2').then((data) => {
      const initData = data.splice(0, 2)
      setData(initData)
      setLocationData(data)
    })
  }, [])

  return (
    <GradientScreenView style = {styles.container}>
      <Image source = {require('../../../../assets/images/Logo_Icon_White.png')} style = {styles.image} />
      <Text h1Style = {styles.header} h1>Create your profile</Text>
      <Card style = {styles.card}>
        <Text h4>Where is your service based?</Text>
        <Text>(Select all that apply)</Text>
        <View style = {styles.checklistView}>
          <MultiChoiceChecklist
            style = {styles.topChecklist}
            height = {110}
            width = {'100%'}
            data = {data}
            onCheck = {onCheck}
          />
          <CheckBox
            title = {<Text style={{flex:1, marginLeft: 34}} h4>Venue Based</Text>}
            containerStyle = {styles.checkbox}
            iconRight
            uncheckedIcon = 'chevron-right'
            checkedIcon = 'chevron-down'
            checkedColor = {colours.primary}
            size = {16}
            checked = {expand}
            onPress = {() => setExpand(!expand)}
          />
          {
            expand && (
              <MultiChoiceChecklist
                style = {styles.topChecklist}
                height = {150}
                width = {'100%'}
                data = {locationData}
                onCheck = {onCheck}
              />
            )
          }
        </View>
        <PrimaryButton
          title = "Next"
          disabled = {Object.keys(choices).length === 0}
          containerStyle = {styles.button}
          onPress = {() => submit()}
        />
      </Card>
    </GradientScreenView>
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
  checklistView: {
    width: '95%',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colours.gray2,
    marginTop: 20,
  },
  topChecklist: {
    borderWidth: 0
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderBottomColor: colours.gray2
  },
  button: {
    marginTop: 30
  }
})

export default index

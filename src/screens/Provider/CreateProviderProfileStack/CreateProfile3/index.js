import React, { useState, useEffect } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import _ from 'lodash'

import GradientScreenView from '../../../../components/views/GradientScreenView'
import MultiChoiceChecklist from '../../../../components/molecules/MultiChoiceChecklist'
import Card from '../../../../components/atoms/Card'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'

import { fetchProviderAttribute, updateSearchProviders } from '../../../../utilities/helper'

function index({ navigation }) {

  const [data, setData] = useState([])
  const [choices, setChoices] = useState({})

  const onCheck = (item) => {
    if (_.has(choices, item.id)) {
      const {[item.id]: deleted, ...rest} = choices
      setChoices(rest)
    } else {
      setChoices({...choices, ...{[item.id]: item.name}})
    }
  }

  const submit = () => {
    updateSearchProviders(choices, '1')
    firestore().collection('Providers').doc(auth().currentUser.uid).update({ 'Responses.1': {...choices} })
    navigation.navigate('CP4')
  }

  useEffect(() => {
    fetchProviderAttribute('1').then((data) => {
      setData(data)
    })
  }, [])

  return (
    <GradientScreenView style = {styles.container}>
      <Image source = {require('../../../../assets/images/Logo_Icon_White.png')} style = {styles.image} />
      <Text h1Style = {styles.header} h1>Create your profile</Text>
      <Card style = {styles.card}>
        <Text h4>Do you offer individual or group sessions?</Text>
        <Text>(Select all that apply)</Text>
        <MultiChoiceChecklist
          style = {styles.checklist}
          height = {120}
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
  checklist: {
    marginTop: 20
  },
  button: {
    marginTop: 30
  }
})

export default index

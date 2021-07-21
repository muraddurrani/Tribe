import React, { useState, useEffect } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import _ from 'lodash'

import { fetchProviderAttribute } from '../../../../utilities/helper'
import GradientView from '../../../../components/views/GradientView'
import MultiChoiceChecklist from '../../../../components/molecules/MultiChoiceChecklist'
import Card from '../../../../components/atoms/Card'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'

function index({ navigation, route }) {

  let query = route.params

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
    query.push(choices)
    navigation.navigate('Search6', query)
  }

  useEffect(() => {
    fetchProviderAttribute('3').then((data) => {
      setData(data)
    })
  }, [])

  return (
    <GradientView style = {styles.container}>
      <Image source = {require('../../../../assets/images/Logo_Icon_White.png')} style = {styles.image} />
      <Card style = {styles.card}>
        <Text h4>On which days are you available?</Text>
        <Text>(Select all that apply)</Text>
        <MultiChoiceChecklist
          style = {styles.checklist}
          height = {310}
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
  checklist: {
    marginTop: 20
  },
  button: {
    marginTop: 30
  }
})

export default index
import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import _ from 'lodash'

import { fetchProviderAttribute } from '../../../../utilities/helper'
import GradientView from '../../../../components/views/GradientView'
import MultiChoiceChecklist from '../../../../components/molecules/MultiChoiceChecklist'
import Card from '../../../../components/atoms/Card'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import SecondaryButton from '../../../../components/buttons/SecondaryButton'

function index({ navigation, route }) {
  let query = route.params
  const [data, setData] = useState([])
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

  const submit = () => {
    query[3] = choices
    navigation.navigate('Search6', query)
  }

  useEffect(() => {
    fetchProviderAttribute('3').then((data) => {
      setData(data)
      setChecked(new Array(data.length).fill(false))
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
          height = {360}
          width = {'95%'}
          data = {data}
          checkArray = {checked}
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
  card: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    width: '90%',
    marginTop: '20%'
  },
  checklist: {
    marginTop: 10
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
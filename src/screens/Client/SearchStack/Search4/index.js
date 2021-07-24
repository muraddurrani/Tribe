import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { CheckBox, Text } from 'react-native-elements'
import _ from 'lodash'

import GradientView from '../../../../components/views/GradientView'
import MultiChoiceChecklist from '../../../../components/molecules/MultiChoiceChecklist'
import Card from '../../../../components/atoms/Card'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import SecondaryButton from '../../../../components/buttons/SecondaryButton'
import colours from '../../../../styles/colours'
import { fetchProviderAttribute } from '../../../../utilities/helper'

function index({ navigation, route }) {
  let query = route.params
  const [data, setData] = useState([])
  const [locationData, setLocationData] = useState([])
  const [choices, setChoices] = useState({})
  const [expand, setExpand] = useState(false)
  const [firstChecked, setFirstChecked] = useState([])
  const [secondChecked, setSecondChecked] = useState([])

  const onCheck = (item) => {
    if (_.has(choices, item.id)) {
      const {[item.id]: deleted, ...rest} = choices
      setChoices(rest)
    } else {
      setChoices({...choices, ...{[item.id]: item.name}})
    }
  }

  const submit = async () => {
    query[2] = choices
    navigation.navigate('Search5', query)
  }

  useEffect(() => {
    fetchProviderAttribute('2').then((data) => {
      const initData = data.splice(0, 2)
      setData(initData)
      setFirstChecked(new Array(initData.length).fill(false))
      setLocationData(data)
      setSecondChecked(new Array(data.length).fill(false))
    })
  }, [])

  return (
    <GradientView style = {styles.container}>
      <Image source = {require('../../../../assets/images/Logo_Icon_White.png')} style = {styles.image} />
      <Card style = {styles.card}>
        <Text h4>Which locations are suitable for you?</Text>
        <Text>(Select all that apply)</Text>
        <MultiChoiceChecklist
          style = {styles.checklist}
          height = {120}
          width = {'95%'}
          data = {data}
          onCheck = {onCheck}
          checkArray = {firstChecked}
        />
        <View style = {{width: '95%'}}>
          <CheckBox
            title = {<Text style={{flex:1, marginLeft: 34}}>Venue Based</Text>}
            containerStyle = {styles.checkbox}
            iconRight
            uncheckedIcon = 'chevron-right'
            checkedIcon = 'chevron-down'
            checkedColor = {colours.primary}
            size = {16}
            checked = {expand}
            onPress = {() => setExpand(true)}
          />
        </View>
        {
          expand && (
            <MultiChoiceChecklist
              height = {190}
              width = {'95%'}
              data = {locationData}
              checkArray = {secondChecked}
              onCheck = {onCheck}
            />
          )
        }
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
  checkbox: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderBottomColor: colours.gray2
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
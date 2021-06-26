import React, { useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import _ from 'lodash'

import GradientScreenView from '../../../../components/views/GradientScreenView'
import SingleChoiceChecklist from '../../../../components/molecules/SingleChoiceChecklist'
import Card from '../../../../components/atoms/Card'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'

const data = [{id: 0, name: 'Just once'},
              {id: 1, name: 'Once a week'},
              {id: 2, name: 'Once every two weeks'},
              {id: 3, name: 'Once a month or less'},
              {id: 4, name: 'I have not decided'}]

function index({ navigation, route }) {

  let query = route.params

  const [choice, setChoice] = useState()

  const onCheck = (item) => {
    setChoice({[item.id]: item.name})
  }

  const submit = () => {
    query.push(choice)
    navigation.navigate('GenerateResults', query)
  }

  return (
    <GradientScreenView style = {styles.container}>
      <Image source = {require('../../../../assets/images/Logo_Icon_White.png')} style = {styles.image} />
      <Card style = {styles.card}>
        <Text h4>How frequently do you want the service?</Text>
        <Text>(Select all that apply)</Text>
        <SingleChoiceChecklist
          style = {styles.checklist}
          height = {290}
          width = {'95%'}
          data = {data}
          onCheck = {onCheck}
        />
        <PrimaryButton
          title = "View Results"
          disabled = {!choice}
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

import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
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
    updateSearchProviders(choices, '5')
    firestore().collection('Providers').doc(auth().currentUser.uid).update({ 'Responses.5': {...choices} } )
    navigation.navigate('EditProfile8')
  }

    useEffect(() => {
      fetchProviderAttribute('5').then((data) => {
        setData(data)
        
        fetchProviderResponse(5, auth().currentUser.uid).
        then(response => {
          setChecked(new Array(data.length).fill(false).map((item, index) => response[index]))
          setChoices(response)
          removeFromSearchProviders(response, '5')
        })
      })
    }, [])


  return (
    <GradientView style = {styles.container}>
      <Image source = {require('../../../../assets/images/Logo_Icon_White.png')} style = {styles.image}/>
      <Text h2Style = {styles.header} h2>Edit your profile</Text>
      <Card style = {styles.card}>
        <Text h4>Which age groups do you support?</Text>
        <Text>(Select all that apply)</Text>
        <MultiChoiceChecklist
          style = {styles.checklist}
          height = {170}
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

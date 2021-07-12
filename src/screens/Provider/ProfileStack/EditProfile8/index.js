import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import _ from 'lodash'

import GradientView from '../../../../components/views/GradientView'
import colours from '../../../../styles/colours'
import SingleChoiceChecklist from '../../../../components/molecules/SingleChoiceChecklist'
import Card from '../../../../components/atoms/Card'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import SecondaryButton from '../../../../components/buttons/SecondaryButton'
import { fetchProviderAttribute, fetchProviderResponse, updateSearchProviders, removeFromSearchProviders } from '../../../../utilities/helper'

function index({ navigation }) {
  const [data, setData] = useState([])
  const [experience, setExperience] = useState({})
  const [checked, setChecked] = useState()

  const onCheck = (item) => {
    setExperience({...{[item.id]: item.name}})
  }

  const submit = () => {
    updateSearchProviders(experience, '6')
    firestore().collection('Providers').doc(auth().currentUser.uid).update({ 'Responses.6': {...experience} } )
    navigation.popToTop()
  }

  useEffect(() => {
    fetchProviderAttribute('6').then((data) => {
      setData(data)

      fetchProviderResponse(6, auth().currentUser.uid).
        then(response => {
          setChecked(Object.keys(response)[0])
          setExperience(response)
          removeFromSearchProviders(response, '6')
        })
    })
  }, [])


  return (
    <GradientView style = {styles.container}>
      <Image source = {require('../../../../assets/images/Logo_Icon_White.png')} style = {styles.image}/>
      <Text h2Style = {styles.header} h2>Edit your profile</Text>
      <Card style = {styles.card}>
        <Text h4>How many years experience do you have?</Text>
        <SingleChoiceChecklist
          style = {styles.checklist}
          height = {230}
          width = {'95%'}
          data = {data}
          initChecked = {checked}
          onCheck = {onCheck}
        />
        <View style = {styles.rowView}>
          <PrimaryButton
            title = "Confirm"
            disabled = {Object.keys(experience).length === 0}
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

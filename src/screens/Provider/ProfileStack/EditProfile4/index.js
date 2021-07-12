import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text, CheckBox } from 'react-native-elements'
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

  const submit = () => {
    updateSearchProviders(choices, '2')
    firestore().collection('Providers').doc(auth().currentUser.uid).update({ 'Responses.2': {...choices} } )
    navigation.navigate('EditProfile5')
  }

    useEffect(() => {
      fetchProviderAttribute('2').then((data) => {
        const initData = data.splice(0, 2)
        setData(initData)
        setLocationData(data)

        fetchProviderResponse(2, auth().currentUser.uid).
        then(response => {
          setFirstChecked(new Array(data.length).fill(false).map((item, index) => response[index]))
          setSecondChecked(new Array(data.length).fill(false).map((item, index) => response[index + initData.length]))
          setChoices(response)
          removeFromSearchProviders(response, '2')
        })
      })
    }, [])


  return (
    <GradientView style = {styles.container}>
      <Image source = {require('../../../../assets/images/Logo_Icon_White.png')} style = {styles.image}/>
      <Text h2Style = {styles.header} h2>Edit your profile</Text>
      <Card style = {styles.card}>
        <Text h4>Where is your service based?</Text>
        <Text>(Select all that apply)</Text>
        <MultiChoiceChecklist
          style = {styles.checklist}
          height = {120}
          width = {'95%'}
          data = {data}
          checkArray = {firstChecked}
          onCheck = {onCheck}
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
              height = {160}
              width = {'95%'}
              data = {locationData}
              checkArray = {secondChecked}
              onCheck = {onCheck}
            />
          )
        }
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

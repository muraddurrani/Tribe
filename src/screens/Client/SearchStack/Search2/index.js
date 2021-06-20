import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Text, CheckBox } from 'react-native-elements'
import ScreenView from '../../../../components/atoms/ScreenView'
import PrimaryButton from '../../../../components/atoms/PrimaryButton'
import firestore from '@react-native-firebase/firestore'
import _ from 'lodash'
import theme from '../../../../styles/theme'

function index({ navigation, route }) {

  let query = route.params

  const [data, setData] = useState([])
  const [locationData, setLocationData] = useState([])
  const [choices, setChoices] = useState({})
  const [checked, setChecked] = useState([])
  const [expand, setExpand] = useState(false)
  const [height, setHeight] = useState(190)

  const fetchData = async () => {
    const dataDoc = await firestore().collection('ProviderAttributes').doc('2').get()
    const dataMap = dataDoc.get('AnswerSet')
    return Object.keys(dataMap).map(key => {
      return {id: key, name: dataMap[key]}
    })
  }

  const handleCheck = (item) => {
    if (_.has(choices, item.id)) {
      const {[item.id]: deleted, ...rest} = choices
      setChoices(rest)
    } else {
      setChoices({...choices, ...{[item.id]: item.name}})
    }
    setChecked(checked.map((bool, index) => index == item.id ? !bool : bool))
  }

  const render = ({item}) => (
    <CheckBox
      containerStyle = {styles.checkbox}
      title = {item.name}
      checked = {checked[item.id]}
      checkedColor = {theme.colours.primary}
      onPress = {() => handleCheck(item)}
      />
  )

  const expandList = () => {
    if (expand) {
      setExpand(false)
      setHeight(190)
    } else {
      setExpand(true)
      setHeight(360)
    }
  }

  async function filter(arr, callback) {
    const fail = Symbol()
    return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i=>i!==fail)
  }

  const submit = async () => {
    query.push(choices)
    console.log(query)
    navigation.navigate('Search3', query)
  }

  useEffect(() => {
    fetchData().then((data) => {
      setChecked(new Array(data.length).fill(false))
      const initData = data.splice(0, 2)
      setData(initData)
      setLocationData(data)
    })
  }, [])

  return (
    <ScreenView style = {styles.container}>
      <Text h1Style = {styles.header} h1>Find a service</Text>
      <Text h4>Which venues/locations are suitable for you?</Text>
      <Text>(Select all that apply)</Text>
      <View style = {{...styles.listView, height: height}} >
        <View>
          <FlatList
            data = {data}
            renderItem = {render}
            keyExtractor = {item => item.id}
          />
        </View>
        <CheckBox
          containerStyle = {styles.checkbox}
          title={<Text style={{flex:1, marginLeft: 34}} h4>Venue Based</Text>}
          iconRight = {true}
          uncheckedIcon = 'chevron-right'
          checkedIcon = 'chevron-down'
          checkedColor = {theme.colours.primary}
          size = {16}
          right = {true}
          checked = {expand}
          onPress = {() => {
            expandList()
          }}
        />
        {expand && (
          <FlatList
            data = {locationData}
            renderItem = {render}
            keyExtractor = {item => item.id}
          />
        )}
      </View>
      <PrimaryButton
        title = "Next"
        disabled = {Object.keys(choices).length === 0}
        onPress = {() => {
          submit()
        }}
        containerStyle = {styles.nextButton}
      />
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colours.gray1,
    alignItems: 'center'
  },
  header: {
    marginVertical: theme.spacing.spacing6
  },
  listView: {
    marginTop: 20,
    borderRadius: 10,
    width: 340,
    padding: theme.spacing.spacing1,
    backgroundColor: theme.colours.gray0,
    borderColor: theme.colours.gray2,
    borderWidth: 1
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderBottomColor: theme.colours.gray1,
    borderWidth: 2
  },
  nextButton: {
    marginTop: 30
  }
})

export default index

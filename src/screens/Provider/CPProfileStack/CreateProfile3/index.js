import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Text, CheckBox } from 'react-native-elements'
import ScreenView from '../../../../components/atoms/ScreenView'
import PrimaryButton from '../../../../components/atoms/PrimaryButton'
import Header from '../../../../components/atoms/Header'
import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import _ from 'lodash'
import theme from '../../../../styles/theme'

function index({ navigation }) {

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

  const submitChoices = () => {
    const ansCollection = firestore().collection('SearchProviders').doc('2').collection('Answers')
    for (const choice in choices) {
      ansCollection.doc(choice).update({IDs: firebase.firestore.FieldValue.arrayUnion(auth().currentUser.uid)})
    }
    firestore().collection('Providers').doc(auth().currentUser.uid).update({ 'Responses.2': {...choices} } )
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
      <Header>Create your profile</Header>
      <ScreenView style = {styles.card}>
        <Text style = {styles.description} h4>Where is your service based?</Text>
        <Text>(Select all that apply)</Text>
        <View style = {{...styles.listView, height: height}}>
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
          submitChoices()
          navigation.navigate('CP4')
        }}
        containerStyle = {styles.nextButton}
      />
      </ScreenView>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colours.primary
  },
  card: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    backgroundColor: theme.colours.gray1
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
  description: {
    marginTop: 35
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

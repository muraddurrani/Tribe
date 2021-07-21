import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

import ScreenView from '../../../../components/views/ScreenView'
import ResultCard from './ResultCard'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'

import colours from '../../../../styles/colours'

function index({ navigation, route}) {

  let {result, query} = route.params


  const render = ({item}) => (
    <ResultCard
      attributes = {item.data}
      id = {item.id}
      frequency = {query[5]}
    />
  )

  return (
    <ScreenView style = {styles.container}>
      <FlatList
        style = {styles.list}
        contentContainerStyle = {styles.listContent}
        data = {result}
        renderItem = {render}
        keyExtractor = {(item, index) => index}
      />
      <PrimaryButton
        title = "Restart Search"
        icon = {<Icon name = "rotate-ccw" color = {colours.gray0}/>}
        containerStyle = {styles.buttonContainer}
        buttonStyle = {styles.button}
        titleStyle = {styles.buttonTitle}
        onPress = {() => navigation.popToTop()}
      />
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.gray1,
    alignItems: 'center'
  },
  list: {
    width: '100%',
  },
  listContent: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 50
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 15,
    width: 200
  },
  button: {
    width: 200
  },
  buttonTitle: {
    marginLeft: 10
  }
})

export default index
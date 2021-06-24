import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { CheckBox } from 'react-native-elements'

import colours from '../../styles/colours'

function SingleChoiceChecklist({data, title, width, height, onCheck, style, ...props}) {

  const [checked, setChecked] = useState()

  const handleCheck = (item) => {
    setChecked(item.id)
  }

  const render = ({item}) => (
      <CheckBox
        containerStyle = {styles.checkbox}
        title = {title ? title : item.name}
        textStyle = {styles.title}
        checked = {checked == item.id}
        checkedColor = {colours.primary}
        onPress = {() => {
          handleCheck(item)
          onCheck(item)
        }}
      />
  )

  return (
    <View style = {{height, width, ...styles.view, ...style}}>
      <FlatList
        {...props}
        showsVerticalScrollIndicator = {false}
        data = {data}
        keyExtractor = {(item, index) => index}
        renderItem = {render}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderBottomColor: colours.gray2
  },
  title: {
    color: colours.gray6
  },
  view: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colours.gray2
  }
  
})

export default SingleChoiceChecklist

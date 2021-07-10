import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { CheckBox } from 'react-native-elements'

import colours from '../../styles/colours'

function MultiChoiceChecklist({data, title, width, height, onCheck, style, ...props}) {
  const [checked, setChecked] = useState([])

  const handleCheck = (i) => {
    setChecked(checked.map((bool, index) => index == i ? !bool : bool))
  }

  const render = (item) => (
    <CheckBox
      containerStyle = {styles.checkbox}
      title = {title ? title : item.item.name}
      textStyle = {styles.title}
      checked = {checked[item.index]}
      checkedColor = {colours.midpoint3}
      onPress = {() => {
        handleCheck(item.index)
        onCheck(item.item)
      }}
    />
  )

  useEffect(() => {
    const len = data.length
    setChecked(new Array(len).fill(false))
  }, [data])

  return (
    <View style = {{height, width, ...style}}>
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
    borderColor: 'transparent'
  },
  title: {
    color: colours.gray6,
    fontWeight: '400'
  }
})

export default MultiChoiceChecklist

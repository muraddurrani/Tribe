import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { CheckBox } from 'react-native-elements'

import colours from '../../styles/colours'

function SingleChoiceChecklist({data, title, width, height, onCheck, initChecked, style, ...props}) {
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
      checkedColor = {colours.midpoint3}
      onPress = {() => {
        handleCheck(item)
        onCheck(item)
      }}
    />
  )

  useEffect(() => {
    if (initChecked) {
      setChecked(initChecked)
    }
  }, [initChecked])

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
    fontWeight: '400',
    textTransform: 'capitalize'
  }
})

export default SingleChoiceChecklist

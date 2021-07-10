import React, { useState } from 'react'
import { View, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import { Input, Icon } from 'react-native-elements'
import TertiaryButton from '../buttons/TertiaryButton'

import colours from '../../styles/colours'

function Dropdown({width, height, label, placeholder, data, onSelect, style}) {
  const [expand, setExpand] = useState(false)
  const [value, setValue] = useState('')

  const render = (item, index) => (
    <TertiaryButton
      key = {index}
      style = {{...styles.button, width: width}}
      title = {item}
      onPress = {() => {
        setValue(item)
        onSelect(item)
        setExpand(false)
      }}
    />
  )

  return (
    <View style = {{...style, width: width}}>
      <TouchableHighlight
        style = {styles.touchable}
        underlayColor = {colours.gray1}
        onPress = {() => setExpand(!expand)}
      >
        <Input
          containerStyle = {{...styles.input, width: width}}
          inputContainerStyle = {{width: width - 20}}
          editable = {false}
          value = {value}
          label = {label}
          placeholder = {placeholder}
          rightIcon = {<Icon name = {expand ? 'chevron-up' : 'chevron-down'}/>}
        />
      </TouchableHighlight>
      {
        expand && (
          <View style = {{height: height}}>
            <ScrollView>
              {data.map(render)}
            </ScrollView>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 60
  },
  touchable: {
    borderRadius: 10
  },
  button: {
    height: 40,
    justifyContent: 'center',
    paddingLeft: 25
  }
})

export default Dropdown

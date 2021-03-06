import React, { useState } from 'react'
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import { Input, Icon } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'

import colours from '../../styles/colours'

function DatePicker({style, width, label, placeholder, onSelect, defaultValue = ''}) {
  const [expand, setExpand] = useState(false)
  const [value, setValue] = useState(defaultValue)
  
  return (
    <View style = {{...style, width}}>
      <TouchableHighlight
        style = {styles.touchable}
        underlayColor = {colours.gray2}
        onPress = {() => setExpand(!expand)}
      >
        <Input
          containerStyle = {{...styles.input, width: width}}
          inputContainerStyle = {{width: width - 20}}
          editable = {false}
          value = {value}
          label = {label}
          placeholder = {placeholder}
          rightIcon = {<Icon name = 'clock'/>}
        />
      </TouchableHighlight>
      {expand && (
        <DateTimePicker
          mode = "time"
          value = {new Date()}
          minuteInterval = {5}
          onChange = {(event, value) => {
            if (value !== undefined) {
              setExpand(false)
              setValue(value.toLocaleString().substring(11, 16))
              onSelect(value)
            }
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 60
  },
  touchable: {
    borderRadius: 10
  }
})

export default DatePicker

import React, { useState } from 'react'
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import { Input, Icon } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'

import colours from '../../styles/colours'

function DatePicker({style, width, label, placeholder, onSelect, defaultValue = '', maxDate, minDate}) {
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
          rightIcon = {<Icon name = 'calendar'/>}
        />
      </TouchableHighlight>
      {expand && (
        <DateTimePicker
          mode = "date"
          value = {new Date()}
          maximumDate = {maxDate}
          minimumDate = {minDate}
          onChange = {(event, value) => {
            if (value !== undefined) {
              setExpand(false)
              setValue(value.toDateString().substring(4))
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

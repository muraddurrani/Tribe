import React, { useState } from 'react'
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import { Input, Icon } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'

import colours from '../../styles/colours'

function DatePicker({width, label, placeholder, onSelect}) {

  const [expand, setExpand] = useState(false)
  const [value, setValue] = useState('')

  return (
    <View style = {{width}}>
      <TouchableHighlight
        style = {styles.touchable}
        underlayColor = {colours.gray2}
        onPress = {() => setExpand(!expand)}
      >
        <Input
          containerStyle = {{width: width}}
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
  touchable: {
    borderRadius: 20
  }
})

export default DatePicker

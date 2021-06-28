import React, { useState } from 'react'
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import { Input, Icon } from 'react-native-elements'
import TertiaryButton from './TertiaryButton'
import theme from '../../styles/theme'
import DateTimePicker from '@react-native-community/datetimepicker'

function DatePicker(props) {

  const [expand, setExpand] = useState(false)
  const [value, setValue] = useState('')

  return (
    <View style = {styles.container}>
      <TouchableHighlight
        underlayColor = {theme.colours.gray2}
        onPress = {() => setExpand(!expand)}
        >
        <Input
          containerStyle = {styles.input}
          editable = {false}
          value = {props.value ? props.value.toDateString().substring(4) : value}
          label = {props.label}
          placeholder = {props.placeholder}
          rightIcon = {<Icon name = 'calendar'/>}
        />
      </TouchableHighlight>
      {
        expand && (
          <DateTimePicker
            mode = "date"
            value = {new Date()}
            onChange = {(event, value) => {
              if (value !== undefined) {
                setExpand(false)
                setValue(value.toDateString().substring(4))
                props.onSelect(value)
              }
            }}
          />
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 160
  },
  input: {
    width: 160
  }
})

export default DatePicker

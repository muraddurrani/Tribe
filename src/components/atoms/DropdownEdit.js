import React, { useState } from 'react'
import { View, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import { Input, Icon } from 'react-native-elements'
import TertiaryButton from './TertiaryButton'
import theme from '../../styles/theme'

function Dropdown(props) {

  const [expand, setExpand] = useState(false)
  const [value, setValue] = useState('')

  const render = (item, index) => (
    <TertiaryButton
      key = {index}
      containerStyle = {styles.buttonContainer}
      buttonStyle = {styles.button}
      title = {item}
      onPress = {() => {
        setValue(item)
        props.onSelect(item)
        setExpand(false)
      }}
    />
  )

  return (
    <View style = {styles.container}>
      <TouchableHighlight
        underlayColor = {theme.colours.gray2}
        onPress = {() => setExpand(!expand)}
        >
        <Input
          containerStyle = {styles.input}
          editable = {false}
          value = {props.value ? props.value : value}
          label = {props.label}
          placeholder = {props.placeholder}
          rightIcon = {<Icon name = 'edit' type = 'material-icons'/>}
        />
      </TouchableHighlight>
      {
        expand && (
          <View style = {{height: 120}}>
            <ScrollView>
            {
              props.data.map(render)
            }
          </ScrollView>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 160
  },
  buttonContainer: {
    width: '100%',
    paddingLeft: 5
  },
  button: {
    justifyContent: 'flex-start'
  },
  input: {
    width: 160
  }
})

export default Dropdown
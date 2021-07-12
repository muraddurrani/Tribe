import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import TertiaryButton from '../../../../components/buttons/TertiaryButton'
import colours from '../../../../styles/colours'

function Tile({style, children, label, onPress}) {
  return (
    <View style = {{...styles.tile, ...style}}>
      <View style = {styles.rowView}>
        <Text style = {styles.label}>{label}</Text>
        <TertiaryButton title = "Edit" style = {styles.button} titleStyle = {styles.buttonTitle} onPress = {onPress} />
      </View>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: colours.gray0,
    width: '80%',
    padding: 10,
    elevation: 3,
    borderRadius: 5,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  label: {
    fontSize: 16
  },
  button: {
    position: 'absolute',
    right: 0,
    top: 1
  },
  buttonTitle: {
    color: colours.midpoint3
  }
})

export default Tile

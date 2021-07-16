import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import colours from '../../styles/colours'

function HomeTile({title, icon, style, children}) {
  return (
    <View style = {{...styles.container, ...style}}>
      <View style = {styles.headerView}>
        {icon}
        <Text h4Style = {styles.header} h4>{title}</Text>
      </View>
      <View style = {styles.body}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.gray0,
    borderRadius: 10,
    width: '80%'
  },
  headerView: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  header: {
    fontSize: 16,
    marginLeft: 10
  },
  body: {
    backgroundColor: colours.gray1,
    borderTopWidth: 1,
    borderTopColor: colours.gray2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
})

export default HomeTile

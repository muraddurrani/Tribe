import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import colours from '../../styles/colours'

function ScrollScreenView({children, style, contentContainerStyle, ...props}) {
  return (
    <ScrollView {...props} style = {{...styles.container, ...style}} contentContainerStyle = {{...styles.content, ...contentContainerStyle}} showsVerticalScrollIndicator = {false}>
      {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.gray1
  },
  content: {
    flexGrow: 1
  }
})

export default ScrollScreenView

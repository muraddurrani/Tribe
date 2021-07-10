import React from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native'

function KeyboardAwareView({children, ...props}) {
  return (
    <KeyboardAvoidingView {...props} style = {styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flexGrow: 1
  }
})

export default KeyboardAwareView

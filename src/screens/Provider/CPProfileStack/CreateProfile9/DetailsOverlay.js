import React from 'react'
import { StyleSheet, View } from 'react-native'
import {Overlay, Text, Icon } from 'react-native-elements'
import theme from '../../../../styles/theme'

function DetailsOverlay(props) {
  return (
    <Overlay
      animationType = 'slide'
      overlayStyle = {styles.container}
      isVisible = {props.isVisible}
    >
      <Text style = {styles.header} h3>Upload some photos!</Text>
      <Text style = {styles.text} >Upload a few photos for potential clients to view when they find your profile.{`\n`}</Text>
      <Text style = {styles.text} >You may choose to upload images of:</Text>
      <View style = {styles.rowView}>
        <Text style = {styles.text} >{'\u25CF'} </Text>
        <Text style = {styles.text} >Yourself</Text>
      </View>
      <View style = {styles.rowView}>
        <Text style = {styles.text} >{'\u25CF'} </Text>
        <Text style = {styles.text} >Your place of work (e.g clinic, facility, place of business)</Text>
      </View>
      <View style = {styles.rowView}>
        <Text style = {styles.text} >{'\u25CF'} </Text>
        <Text style = {styles.text} >Your company logo or other graphics</Text>
      </View>
      <Icon
        containerStyle = {styles.icon}
        name = "x"
        color = {theme.colours.accent2}
        onPress = {props.onPress}
      />
    </Overlay>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingVertical: theme.spacing.spacing5,
    paddingHorizontal: theme.spacing.spacing4,
  },
  header: {
    marginBottom: theme.spacing.spacing4,
    alignSelf: 'center'
  },
  rowView: {
    flexDirection: 'row'
  },
  text: {
    lineHeight: 20
  },
  icon: {
    marginTop: theme.spacing.spacing4
  }
})

export default DetailsOverlay

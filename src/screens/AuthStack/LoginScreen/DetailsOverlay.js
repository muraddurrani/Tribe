import React from 'react'
import { StyleSheet } from 'react-native'
import {Overlay, Text, Icon } from 'react-native-elements'
import theme from '../../../styles/theme'

function DetailsOverlay(props) {
  return (
    <Overlay
      overlayStyle = {styles.container}
      isVisible = {props.isVisible}
      >
      <Text h2>What is Tribe?</Text>
      <Text style = {styles.text}>
        Tribe is a supportive platform for parents of children with special needs and professionals to connect.
        {`\n`}
        {`\n`}
        So, how exactly can you use Tribe?
        {`\n`}
        {`\n`}
        The first step is to create an account! If you are a parent, provide your particulars and the particulars of your child. Then, design your profile by selecting your preferences.
            Tribe will then store this information in Firebase and run our match-making algorithm to determine the best matches for you! 
      </Text>
      <Icon
        name = "x"
        color = {theme.colours.accent2}
        onPress = {props.onPress}
      />
    </Overlay>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    padding: theme.spacing.spacing5,
    alignItems: 'center'
  },
  text: {
    lineHeight: 18
  }
})

export default DetailsOverlay

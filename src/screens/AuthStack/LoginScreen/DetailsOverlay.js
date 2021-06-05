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
      <Text style = {styles.header} h3>What is Tribe?</Text>
      <Text style = {styles.text}>
        Tribe is a supportive platform that connects parents of children with special needs and professionals.
        {`\n`}
        So, how exactly can you use Tribe?
      </Text>
      <Text style = {styles.subHeader} h4>For parents</Text>
      <Text style = {styles.text}>
        Create an account and provide your particulars and the particulars of your child. Then, design your profile by selecting your preferences.
        Tribe will use this information to match you with the best service providers for your and faciliate all communication and scheduling needs!
      </Text>
      <Text style = {styles.subHeader} h4>For professionals</Text>
      <Text style = {styles.text}>
        Create an account and provide us with information regarding your service. Tribe will do the rest of the work and connect you with potential clients
        all over the country.
      </Text>
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
  subHeader: {
    marginTop: theme.spacing.spacing3
  },
  text: {
    lineHeight: 20
  },
  icon: {
    marginTop: theme.spacing.spacing4
  }
})

export default DetailsOverlay

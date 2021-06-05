import React from 'react'
import { Text } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'
import ScreenView from '../../../components/atoms/ScreenView'
import PrimaryButton from '../../../components/atoms/PrimaryButton'
import theme from '../../../styles/theme'

function index({ navigation }) {
  return (
    <ScreenView style = {styles.container}>
      <View style = {styles.content}>
        <Text h3>Reset your password</Text>
        <Text style = {styles.body}>An email has been sent to your email address to reset your password.</Text>
        <PrimaryButton
          containerStyle = {styles.buttonContainer}
          title = "Return to Login"
          onPress = {() => navigation.popToTop()}
        />
      </View>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  content: {
    marginHorizontal: theme.spacing.spacing3,
    backgroundColor: theme.colours.gray1,
    paddingVertical: theme.spacing.spacing5,
    paddingHorizontal: theme.spacing.spacing4,
    borderRadius: 10
  },
  body: {
    marginTop: theme.spacing.spacing2
  },
  buttonContainer: {
    marginTop: theme.spacing.spacing4,
    width: 140,
    alignSelf: 'center'
  }
})

export default index

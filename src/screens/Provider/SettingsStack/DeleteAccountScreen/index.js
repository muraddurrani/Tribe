import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, Text } from 'react-native-elements'

import DeleteOverlay from './DeleteOverlay'
import KeyboardScreenView from '../../../../components/views/KeyboardScreenView'
import Header from '../../../../components/molecules/Header'
import Card from '../../../../components/atoms/Card'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import SecondaryButton from '../../../../components/buttons/SecondaryButton'
import colours from '../../../../styles/colours'

function index({ navigation }) {
  const [deleteAcc, setDeleteAcc] = useState(false)

  return (
    <KeyboardScreenView style = {styles.container}>
      <Header icon title = "Delete Account" onPress = {() => navigation.goBack()}/>
      <Card style = {styles.card}>
        <Icon
          name = 'alert-circle'
          color = {colours.midpoint3}
          size = {50}
        />
        <Text h3Style = {styles.title} h3>Are you sure?</Text>
        <Text h4>Deleting your account is permanent and cannot be undone. Are you sure you would like to delete your account?</Text>
        <View style = {styles.rowView}>
          <SecondaryButton
            title = "Back"
            containerStyle = {styles.button}
            onPress = {() => navigation.goBack()}
          />
          <PrimaryButton
            title = "Delete"
            containerStyle = {styles.button}
            onPress = {() => setDeleteAcc(true)}
          />
        </View>
      </Card>
      <DeleteOverlay isVisible = {deleteAcc} onPress = {() => setDeleteAcc(false)}/>
    </KeyboardScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  card: {
    width: '90%',
    alignItems: 'center',
    padding: 30,
    marginTop: 70
  },
  title: {
    marginTop: 10,
    marginBottom: 20
  },
  rowView: {
    flexDirection: 'row',
    marginTop: 40
  },
  button: {
    marginHorizontal: 10
  }
})

export default index

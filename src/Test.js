import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Card from './components/atoms/Card'
import PrimaryButton from './components/buttons/PrimaryButton'
import SecondaryButton from './components/buttons/SecondaryButton'
import TertiaryButton from './components/buttons/TertiaryButton'
import DatePicker from './components/molecules/DatePicker'
import Dropdown from './components/molecules/Dropdown'
import Header from './components/molecules/Header'
import CheckList from './components/molecules/MultiChoiceChecklist'
import HomeTile from './components/molecules/HomeTile'
import SingleChoiceChecklist from './components/molecules/SingleChoiceChecklist'

export default function Test({navigation}) {
  return (
      <View>
        <Header title = "Test"/>
        <Card style = {styles.card}>
          <PrimaryButton title = 'Button 1'/>
          <SecondaryButton title = 'Button 2'/>
          <TertiaryButton title = 'Button 3'/>
          <DatePicker 
            width = {150}
            label = "Date of birth"
            placeholder = "05/12/2000"
            onSelect = {() => console.log("hello")}
            defaultValue = ''
          />
          <Dropdown
            width = {180}
            height = {60}
            label = 'Gender'
            placeholder = 'e.g. female'
            data = {['male', 'female', 'others']}
          />
        
        </Card>
      </View>
  )
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    width: '90%',
    marginTop: 40
  },

})
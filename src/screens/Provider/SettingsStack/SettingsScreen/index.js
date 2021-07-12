import React, { useContext } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { AuthContext } from '../../../../navigation/AuthProvider'

import ScreenView from '../../../../components/views/ScreenView'
import Header from '../../../../components/molecules/Header'

import colours from '../../../../styles/colours'

function index({ navigation }) {
  const { logout } = useContext(AuthContext)

  const list = [
    {
      title: 'Change Password',
      colour: colours.gray6,
      chevron: true,
      onPress: () => navigation.navigate('ChangePassword')
    },
    {
      title: 'Delete Account',
      colour: colours.gray6,
      chevron: true,
      onPress: () => navigation.navigate('DeleteAccount')
    },
    {
      title: 'Logout',
      colour: colours.midpoint3,
      chevron: false,
      onPress: () => logout()
    }
  ]

  const render = ({item}) => (
    <ListItem
      containerStyle = {{backgroundColor: colours.gray0}}
      style = {{borderBottomColor: colours.gray2, borderBottomWidth: 1}}
      onPress = {() => item.onPress()}
    >
      <ListItem.Content>
        <ListItem.Title style = {{color: item.colour}}>{item.title}</ListItem.Title>
      </ListItem.Content>
      {item.chevron && <ListItem.Chevron size = {20}/>}
    </ListItem>
  )

  return (
    <ScreenView>
      <Header title = "Settings"/>
      <View>
        <FlatList
          style = {styles.list}
          contentContainerStyle = {styles.listContent}
          data = {list}
          renderItem = {render}
          keyExtractor = {(item, index) => index}
        />
      </View>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  list: {
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colours.gray2,
    borderBottomWidth: 0,
    overflow: 'hidden',
    marginTop: 40,
  },
})

export default index

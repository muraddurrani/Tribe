import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text, ListItem } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'

import HomeTile from '../../../components/molecules/HomeTile'
import ProfileIcon from '../../../components/molecules/ProfileIcon'
import colours from '../../../styles/colours'

function MatchTile({data, style}) {
  const [newMatch, setNewMatch] = useState(false)
  const [photo, setPhoto] = useState()
  const [name, setName] = useState('')
  const [service, setService] = useState('')
  const [mentions, setMentions] = useState(0)
  const navigation = useNavigation()
  
  useEffect(() => {
    if (data.length > 0) {
      setMentions(data.length - 1)
      const featured = data[0]
      setService(featured.service)
      firestore().collection('Providers').doc(featured.ID).get().
        then(doc => {
          setPhoto(doc.data().profilePhoto)
          setName(doc.data().fullName)
        })
      setNewMatch(true)      
    } else {
      setNewMatch(false)
    }
  }, [data])

  return (
    <HomeTile
      icon = {<Icon name = 'puzzle-outline' type = 'material-community' color = {colours.gray7}/>}
      title = "Matches"
      style = {style}
    >
      {
        newMatch
          ? (
            <ListItem style = {styles.itemContainer} containerStyle = {styles.item} onPress = {() => navigation.navigate('Chat')}>
              <ProfileIcon photo = {photo} size = {40}/>
              <ListItem.Content>
                <ListItem.Title>{name}</ListItem.Title>
                <ListItem.Subtitle>{service}</ListItem.Subtitle>
              </ListItem.Content>
                {mentions > 0 && <Text>+{mentions} more</Text>}
            </ListItem>
          )
          : (
            <Text style = {styles.text}>No new matches</Text>
          )
      }
    </HomeTile>
  )
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemContainer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  item: {
    backgroundColor: colours.gray1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  text: {
    fontSize: 16,
    marginLeft: 20,
    marginVertical: 15
  }
})

export default MatchTile

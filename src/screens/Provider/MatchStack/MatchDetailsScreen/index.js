import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Avatar, Text, Divider } from 'react-native-elements'
import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import ScreenView from '../../../../components/atoms/ScreenView'
import PrimaryButton from '../../../../components/atoms/PrimaryButton'
import SecondaryButton from '../../../../components/atoms/SecondaryButton'
import theme from '../../../../styles/theme'

function index({ navigation, route }) {

  const {id, data} = route.params
  const [service, setService] = useState()
  const [provInfo, setProvInfo] = useState()

  const confirmMatch = async () => {
    const ref = firestore().collection('Chat').doc().collection('Messages').doc('info')
    ref.set({
      providerID: auth().currentUser.uid,
      clientID: id,
      providerName: provInfo.name,
      clientName: data.parentName,
      providerImages: provInfo.images,
      clientImage: data.image
    })
    /**
    await firestore().collection('Clients').doc(id).collection('Mesages').doc().set({
      reference: ref,
      providerID: auth().currentUser.uid,
      providerName: provInfo.name,
      provImages: provInfo.images,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    })
    */
  }

  useEffect(() => {
    firestore().collection('ProviderAttributes').doc('0').get().
      then(doc => {
        setService(doc.data().AnswerSet[data.service][0].toUpperCase() + doc.data().AnswerSet[data.service].substring(1))
    })
    firestore().collection('Providers').doc(auth().currentUser.uid).get().
      then(doc => setProvInfo(doc.data()))
  })

  return (
    <ScreenView>
      <View style = {styles.card}>
        {
          !data.image && (
            <Avatar
              containerStyle = {styles.avatar}
              icon = {{name: 'user', color: theme.colours.gray5, type: 'feather'}}
              size = {220}
            />
          )
        }
        {
          data.image && (
            <Image
              source = {{uri: data.image}}
              style = {styles.image}
            />
          )
        }
        <View style = {styles.rowView}>
          <View style = {{width: '50%'}}>
            <Text h4>{data.childName}</Text>
          </View>
          <View style = {{width: '50%', alignItems: 'flex-end'}}>
            <Text h4>{data.age} years old</Text>
          </View>
        </View>
        {
          data.gender.length !== 0 && (
            <Text>{data.gender}</Text>
          )
        }
        <Text>Parent's name: {data.parentName}</Text>
        <Divider style = {styles.divider} />
        <Text>{service}</Text>
        <Text>
          {
            data.sessionTypes.map((str, i) => {
              if (i == data.sessionTypes.length - 1) {
                return str
              } else {
                return str + ', '
              }
            })
          }
        </Text>
        <Text>
          {
            data.locations.map((str, i) => {
              if (i == data.locations.length - 1) {
                return str
              } else {
                return str + ', '
              }
            })
          }
        </Text>
        <Text>
          {
            data.days.map((str, i) => {
              if (i == data.days.length - 1) {
                return str
              } else {
                return str + ', '
              }
            })
          }
        </Text>
        <Text>
          {
            data.times.map((str, i) => {
              if (i == data.times.length - 1) {
                return str
              } else {
                return str + ', '
              }
            })
          }
        </Text>
        <Text>{data.frequency[0]}</Text>
        <View style = {styles.buttonView}>
          <SecondaryButton containerStyle = {styles.button} title = "Dismiss"/>
          <PrimaryButton containerStyle = {styles.button} title = "Match" onPress = {() => confirmMatch()}/>
        </View>
      </View>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing6
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: theme.colours.gray2,
    marginBottom: 15
  },
  image: {
    alignSelf: 'center',
    width: 220,
    height: 220,
    marginBottom: 15
  },
  rowView: {
    flexDirection: 'row'
  },
  divider: {
    height: 2,
    backgroundColor: theme.colours.gray2,
    marginHorizontal: theme.spacing.spacing2,
    marginTop: theme.spacing.spacing2,
    marginBottom: theme.spacing.spacing4
  },
  buttonView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 20
  },
  button: {
    marginHorizontal: 15
  }
})

export default index

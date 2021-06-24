import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Avatar, BottomSheet, Icon, Text } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import _ from 'lodash'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'

import TertiaryButton from '../../../../components/buttons/TertiaryButton'
import Transition from '../../../../components/molecules/Transition'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'

import colours from '../../../../styles/colours'

function index({ navigation }) {

  const [photo, setPhoto] = useState()
  const [photoPresent, setPhotoPresent] = useState(false)
  const [showSheet, setShowSheet] = useState(false)
  const [loading, setLoading] = useState(false)

  //Launches phone's camera for user to take a photo
  const chooseFromCamera = () => {
    setShowSheet(false)
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets) {
        setPhoto(response.assets[0].uri)
        setPhotoPresent(true)
      }
    })
  }

  //Launches phone's gallery for user to select one photo
  const chooseFromGallery = () => {
    setShowSheet(false)
    launchImageLibrary({mediaType: 'photo', selectionLimit: 1}, response => {
      if (response.assets) {
        setPhoto(response.assets[0].uri)
        setPhotoPresent(true)
      }
    })
  }

  const submit = async () => {
    if (photoPresent) {
      const filepath = `Providers/${auth().currentUser.uid}/${photo.substring(photo.length - 12)}`
      setLoading(true)
      await storage().ref().child(filepath).putFile(photo).
        then(() => storage().ref().child(filepath).getDownloadURL()).
        then(url => firestore().collection('Providers').doc(auth().currentUser.uid).update({ profilePhoto: url}))
    }
    navigation.navigate('Home')
  }

  return (
    <View style = {{flex: 1}}>
      <View style = {styles.topContainer}>
        <Image source = {require('../../../../assets/images/Logo_Icon_White.png')} style = {styles.logo} />
        <Text h1Style = {styles.header} h1>Almost done...</Text>
        <Text h4Style = {styles.description} h4>Upload a profile photo</Text>
        {
          photoPresent
            ? (
              <View>
                <View style = {styles.imageContainer}>
                  <Image
                    style = {styles.image}
                    source = {{uri: photo}}
                  />
                  <Icon
                    name = 'minus'
                    color = {colours.gray0}
                    containerStyle = {styles.minusButton}
                    onPress = {() => setPhotoPresent(false)}
                  />
                </View>
                <TertiaryButton
                  title = "Select a different photo"
                  onPress = {() => setShowSheet(true)}
                  style = {styles.addPhotoButton}
                  titleStyle = {styles.addPhotoTitle}
                />
              </View>
            )
            : (
              <View style = {styles.avatarContainer}>
                <Avatar
                  containerStyle = {styles.avatar}
                  icon = {{name: 'camera', color: colours.gray4, type: 'entypo'}}
                  size = {200}
                  onPress = {() => setShowSheet(true)}
                >
                  <Icon
                    name = 'plus'
                    color = {colours.gray0}
                    containerStyle = {styles.plusButton}
                  />
                  <Text style = {styles.avatarText}>Upload photo</Text>
                </Avatar>
              </View>
            )
        }
        <BottomSheet
          isVisible = {showSheet}
          >
            <Icon
              name = 'x'
              color = {colours.accent2}
              containerStyle = {styles.bottomSheetIcon}
              onPress = {() => setShowSheet(false)}
            />
            <TertiaryButton
              style = {styles.bottomSheetCamera}
              activeOpacity = {0.95}
              title = "Launch Camera"
              icon = {{name: 'camera', type: 'feather'}}
              containerStyle = {styles.sheetButtonContainer}
              buttonStyle = {styles.sheetButton}
              onPress = {() => chooseFromCamera()}
            />
            <TertiaryButton
              style = {styles.bottomSheetGallery}
              activeOpacity = {0.95}
              title = "Launch Image Gallery"
              icon = {{name: 'image', type: 'feather'}}
              onPress = {() => chooseFromGallery()}
            />
          </BottomSheet>
    </View>
      <View style = {styles.bottomContainer}>
        <Transition />
        <PrimaryButton
          title = "Complete Profile"
          containerStyle = {styles.completeButton}
          buttonStyle = {styles.completeButton}
          loading = {loading}
          onPress = {() => submit()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    backgroundColor: colours.primary,
    paddingBottom: 10
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: colours.gray0,
    alignItems: 'center'
  },
  logo: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 15,
    right: 20
  },
  header: {
    marginTop: '30%',
    marginBottom: '10%'
  },
  description: {
    color: colours.gray0
  },
  avatarContainer: {
    marginTop: 20,
    backgroundColor: colours.gray0,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  avatar: {
    backgroundColor: colours.gray0,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  plusButton: {
    position: 'absolute',
    padding: 2,
    top: 120,
    left: 130,
    backgroundColor: colours.accent1,
    borderRadius: 24,
    borderColor: colours.gray0,
    borderWidth: 6
  },
  avatarText: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 15
  },
  imageContainer: {
    height: 220,
    width: 240,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 20
  },
  minusButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colours.accent2,
    padding: 2,
    borderRadius: 20
  },
  addPhotoButton: {
    marginTop: 15,
    alignSelf: 'center'
  },
  addPhotoTitle: {
    color: colours.gray0
  },
  bottomSheetCamera: {
    width: '100%',
    height: 70,
    backgroundColor: colours.gray1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colours.gray1,
    borderBottomColor: colours.gray2,
    borderWidth: 1
  },
  bottomSheetGallery: {
    width: '100%',
    height: 70,
    backgroundColor: colours.gray1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomSheetIcon: {
    height: 70,
    backgroundColor: colours.gray1,
    justifyContent: 'center',
    width: '100%'
  },
  completeButton: {
    width: 160
  }
})

export default index

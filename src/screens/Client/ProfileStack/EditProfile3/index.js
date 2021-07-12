import React, { useContext, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Divider, Icon, Text } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import _ from 'lodash'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import { AuthContext } from '../../../../navigation/AuthProvider'

import GradientView from '../../../../components/views/GradientView'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import SecondaryButton from '../../../../components/buttons/SecondaryButton'

import colours from '../../../../styles/colours'

function index({ navigation }) {
  const { userData } = useContext(AuthContext)
  const [photo, setPhoto] = useState(userData.profilePhoto)
  const [photoPresent, setPhotoPresent] = useState(false)
  const [loading, setLoading] = useState(false)

    //Launches phone's camera for user to take a photo
    const chooseFromCamera = () => {
      launchCamera({mediaType: 'photo'}, response => {
        if (response.assets) {
          setPhoto(response.assets[0].uri)
          setPhotoPresent(true)
        }
      })
    }
  
    //Launches phone's gallery for user to select one photo
    const chooseFromGallery = () => {
      launchImageLibrary({mediaType: 'photo', selectionLimit: 1}, response => {
        if (response.assets) {
          setPhoto(response.assets[0].uri)
          setPhotoPresent(true)
        }
      })
    }

    const submit = async () => {
      if (photo) {
        const filepath = `Clients/${auth().currentUser.uid}/${photo.substring(photo.length - 12)}`
        setLoading(true)
        await storage().ref().child(filepath).putFile(photo).
          then(() => storage().ref().child(filepath).getDownloadURL()).
          then(url => firestore().collection('Clients').doc(auth().currentUser.uid).update({ profilePhoto: url}))
      } else {
        firestore().collection('Clients').doc(auth().currentUser.uid).update({ profilePhoto: null})
      }
      navigation.popToTop()
    }

  return (
    <GradientView style = {styles.container}>
      {photo
        ? (
          <View style = {styles.imageView}>
            <Image
              style = {styles.image}
              source = {{uri: photo}}
            />
            <Icon
              name = 'x'
              color = {colours.gray0}
              containerStyle = {styles.minusButton}
              onPress = {() => setPhoto(null)}
            />
          </View>
        )
        : (
          <View style = {styles.noImageView}>
            <Icon name = 'user' size = {80} type = 'entypo' containerStyle = {styles.cameraIcon}/>
          </View>
        )
      }
      <View style = {styles.optionsView}>
        <SecondaryButton
          icon = {<Icon name = 'camera' color = {colours.gray0} containerStyle = {{marginRight: 10}}/>}
          title = "Launch Camera"
          containerStyle = {styles.optionButtonContainer}
          buttonStyle = {styles.optionButton}
          titleStyle = {styles.optionTitle}
          onPress = {() => chooseFromCamera()}
        />
        <View style = {styles.rowView}>
          <Divider style = {styles.divider} />
          <Text h4Style = {styles.optionsText} h4>or</Text>
          <Divider style = {styles.divider} />
        </View>
        <SecondaryButton
          icon = {<Icon name = 'image' color = {colours.gray0} containerStyle = {{marginRight: 10}}/>}
          title = "Launch Image Gallery"
          containerStyle = {styles.optionButtonContainer}
          buttonStyle = {styles.optionButton}
          titleStyle = {styles.optionTitle}
          onPress = {() => chooseFromGallery()}
        />
      </View>
      <View style = {{...styles.rowView, marginTop: 80}}>
        <PrimaryButton
          title = "Confirm"
          containerStyle = {styles.buttonContainer}
          buttonStyle = {styles.completeButton}
          titleStyle = {styles.completeTitle}
          loading = {loading}
          onPress = {() => submit()}
        />
      </View>
    </GradientView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  noImageView: {
    width: '100%',
    height: 250,
    backgroundColor: colours.gray2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40
  },
  imageView: {
    width: '100%',
    height: 250,
  },
  minusButton: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  image: {
    width: '100%',
    height: 250
  },
  cameraIcon: {
    marginTop: 30,
  },
  optionsView: {
    marginTop: 70,
    alignItems: 'center'
  },
  optionButtonContainer: {
    width: 200,
    height: 50
  },
  optionButton: {
    width: 200,
    height: 50,
    borderColor: 'transparent'
  },
  optionTitle: {
    color: colours.gray0
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  divider: {
    height: 2,
    width: 50,
    backgroundColor: colours.gray0
  },
  optionsText: {
    color: colours.gray0,
    marginHorizontal: 20
  },
  buttonContainer: {
    marginHorizontal: 20
  },
  completeButton: {
    backgroundColor: colours.gray0
  },
  completeTitle: {
    color: colours.midpoint1
  },
  backButton: {
    borderColor: 'transparent'
  },
  backTitle: {
    color: colours.gray0
  }
})

export default index

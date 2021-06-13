import React, { useState } from 'react'
import { View, StyleSheet, ImageBackground, Image } from 'react-native'
import { Avatar, BottomSheet, Icon, Text } from 'react-native-elements'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import ScreenView from '../../../../components/atoms/ScreenView'
import PrimaryButton from '../../../../components/atoms/PrimaryButton'
import TertiaryButton from '../../../../components/atoms/TertiaryButton'
import DetailsOverlay from './DetailsOverlay'
import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import theme from '../../../../styles/theme'

function index({ navigation }) {

  const [photos, setPhotos] = useState([])
  const [index, setIndex] = useState(0)
  const [photoPresent, setPhotoPresent] = useState(false)
  const [showSheet, setShowSheet] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(true)
    const promises = photos.map(async photo => {
      const filepath = `Providers/${auth().currentUser.uid}/${photo.substring(photo.length - 12)}`
      const upload = await storage().ref().child(filepath).putFile(photo).
        then(() => storage().ref().child(filepath).getDownloadURL()).
        then(url => firestore().collection("Providers").doc(auth().currentUser.uid).update({ images: firebase.firestore.FieldValue.arrayUnion(url) }))
      return upload
    })
    const uploads = await Promise.all(promises)
    navigation.navigate('HomeTab')
  }

  const render = (source) => (
    <View style = {styles.imageContainer}>
      <Image
        style = {styles.image}
        source = {{uri: source.item}}
      />
      <Icon
        name = 'minus'
        color = 'white'
        containerStyle = {styles.minusButton}
        onPress = {() => {
          const temp = [...photos]
          temp.splice(source.index, 1)
          setPhotos(temp)
          if (temp.length == 0) {setPhotoPresent(false)}
        }}
      />
    </View>
  )

  return (
    <ScreenView style = {styles.container}>
      <ImageBackground source = {require('../../../../assets/images/ProfilePic_Background.png')} style = {styles.background}>
        <Text h1Style ={styles.header} h1>Almost Done</Text>
        <View style = {styles.rowView}>
          <Text h4Style = {styles.description} h4>Upload some photos</Text>
          <Icon
            name = 'info'
            color = {theme.colours.gray0}
            containerStyle = {styles.infoIcon}
            onPress = {() => setShowOverlay(true)}
          />
        </View>
        {
          !photoPresent && (
            <View style = {styles.avatarContainer}>
              <Avatar
                containerStyle = {styles.avatar}
                icon = {{name: 'camera', color: theme.colours.gray5, type: 'entypo'}}
                size = {220}
                onPress = {() => setShowSheet(true)}
                >
                <Icon
                  name = 'plus'
                  color = {theme.colours.gray0}
                  containerStyle = {styles.plusButton}
                />
                <Text style = {styles.avatarText}>Upload photo</Text>
              </Avatar>
            </View>
          )
        }
        {
          photoPresent && (
            <View style = {{alignItems: 'center'}}>
              <View style = {styles.carouselContainer}>
                <Carousel
                  data = {photos}
                  renderItem = {render}
                  sliderWidth = {260}
                  itemWidth = {260}
                  onSnapToItem = {index => setIndex(index)}
                />
              </View>
              <Pagination
                activeDotIndex = {index}
                dotsLength = {photos.length}
                containerStyle = {{paddingVertical: theme.spacing.spacing3}}
              />
              <TertiaryButton
                title = "Add Photos"
                buttonStyle = {styles.addPhotoButton}
                onPress = {() => setShowSheet(true)}
              />
            </View>
          )
        }

        <PrimaryButton
          title = "Complete"
          loading = {loading}
          onPress = {() => {
            submit()
          }}
          containerStyle = {styles.completeButton}
        />
      </ImageBackground>

      <BottomSheet
        isVisible = {showSheet}
      >
        <TertiaryButton
          icon = {{name: 'x', type: 'feather', color: theme.colours.accent2}}
          containerStyle = {styles.sheetButtonContainer}
          buttonStyle = {styles.sheetButton}
          onPress = {() => setShowSheet(false)}
        />
        <TertiaryButton
          title = "Launch Camera"
          icon = {{name: 'camera', type: 'feather'}}
          containerStyle = {styles.sheetButtonContainer}
          buttonStyle = {styles.sheetButton}
          onPress = {() => {
            setShowSheet(false)
            launchCamera({mediaType: 'photo', selectionLimit: 0}, response => {
              if (response.assets) {
                response.assets.map(file => {
                  setPhotos(prev => [file.uri, ...prev])
                })
                setPhotoPresent(true)
              }
            })
          }}
        />
        <TertiaryButton
          title = "Launch Image Gallery"
          icon = {{name: 'image', type: 'feather'}}
          containerStyle = {styles.sheetButtonContainer}
          buttonStyle = {styles.sheetButton}
          onPress = {() => {
            setShowSheet(false)
            launchImageLibrary({mediaType: 'photo', selectionLimit: 0}, response => {
              if (response.assets) {
                response.assets.map(file => {
                  setPhotos(prev => [file.uri, ...prev])
                })
                setPhotoPresent(true)
              }
            })
          }}
        />
      </BottomSheet>
      <DetailsOverlay
        isVisible = {showOverlay}
        onPress = {() => setShowOverlay(false)}
      />
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colours.gray1
  },
  background: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    color: theme.colours.gray0,
    marginTop: theme.spacing.spacing8,
    marginBottom: theme.spacing.spacing4
  },
  rowView: {
    flexDirection: 'row'
  },
  description: {
    color: theme.colours.gray0,
    fontSize: 16
  },
  infoIcon: {
    marginLeft: theme.spacing.spacing2
  },
  avatarContainer: {
    marginTop: 20,
    backgroundColor: theme.colours.gray1,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  avatar: {
    backgroundColor: theme.colours.gray1,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  plusButton: {
    position: 'absolute',
    top: 130,
    left: 140,
    padding: theme.spacing.spacing0,
    backgroundColor: theme.colours.accent1,
    borderRadius: 24,
    borderColor: theme.colours.gray1,
    borderWidth: 6
  },
  avatarText: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10
  },
  carouselContainer: {
    height: 240,
    width: 260,
    borderRadius: 15,
  },
  imageContainer: {
    height: 240,
    width: 260,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    height: 220,
    width: 220,
    borderRadius: 15
  },
  minusButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: theme.colours.accent2,
    padding: theme.spacing.spacing0,
    borderRadius: 20
  },
  addPhotoButton: {
    backgroundColor: theme.colours.gray2
  },
  sheetButtonContainer: {
    width: '100%',
    height: 60
  },
  sheetButton: {
    height: 60
  },
  completeButton: {
    position: 'absolute',
    bottom: 60
  }
})

export default index

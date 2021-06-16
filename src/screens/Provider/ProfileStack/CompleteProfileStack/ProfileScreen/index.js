import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, Image } from 'react-native'
import { Avatar, Icon, Text, Divider } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { AuthContext } from '../../../../../navigation/AuthProvider'
import PrimaryButton from '../../../../../components/atoms/PrimaryButton'
import theme from '../../../../../styles/theme'

function index({ navigation }) {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [photos, setPhotos] = useState([])
  const [serviceData, setServiceData] = useState([])
  const [availData, setAvailData] = useState([])
  const [description, setDescription] = useState('')
  const [photoPresent, setPhotoPresent] = useState(false)
  const [index, setIndex] = useState(0)
  
  const [expand, setExpand] = useState(false)
  const { logout } = useContext(AuthContext)

  const fetchData = async () => {
    const doc = await firestore().collection('Providers').doc(auth().currentUser.uid).get()
    const data = doc.data()
    return data
  }

  const renderImages = (source) => (
    <Image
      style = {styles.image}
      source = {{uri: source.item}}
    />
  )

  const renderService = (item, index) => (
    <Text style = {styles.text} key = {index}>
      {item.map((str, i) => {
        if (i === item.length - 1) {
          return str[0].toUpperCase() + str.substring(1)
        } else {
          return str[0].toUpperCase() + str.substring(1) + ', '
        }
      })}
    </Text>
  )

  const renderAvail = (item, index) => (
    <Text style = {styles.text} key = {index}>
      {item.map((str, i) => {
        if (i === item.length - 1) {
          return str[0].toUpperCase() + str.substring(1)
        } else {
          return str[0].toUpperCase() + str.substring(1) + ', '
        }
      })
      }
    </Text>
  )

  useEffect(() => {
    fetchData().then((data) => {
      setName(data.name)
      setEmail(data.email)
      setNumber(data.number)
      setDescription(data.description)
      
      var responses = data.Responses
      responses = Object.values(responses).map(response => Object.values(response))
      const availability = responses.splice(3, 2)
      setServiceData(responses)
      setAvailData(availability)
  
      if (data.images) {
        setPhotos(data.images)
        setPhotoPresent(true)
      }
    })
  }, [])
  
  return (
    <ScrollView style = {styles.container}>
      <Text h2Style = {styles.header} h2>Your Profile</Text>
      {
        !photoPresent && (
          <Avatar
            containerStyle = {styles.avatar}
            icon = {{name: 'user', color: theme.colours.gray5, type: 'feather'}}
            size = {220}
          />
        )
      }
      {
        photoPresent && (
          <View style = {{alignItems: 'center'}}>
            <View style = {styles.carouselContainer}>
              <Carousel
                data = {photos}
                renderItem = {renderImages}
                sliderWidth = {240}
                itemWidth = {220}
                contentContainerStyle = {{padding: 10}}
                onSnapToItem = {index => setIndex(index)}
              />
            </View>
            <Pagination
              activeDotIndex = {index}
              dotsLength = {photos.length}
              containerStyle = {{paddingVertical: theme.spacing.spacing3}}
            />
          </View>
        )
      }
      <Text h3>{name}</Text>
      <View style = {styles.descriptionView}>
        <Text style = {styles.text}>{description}</Text>
      </View>
      <View style = {expand ? styles.expandedView: styles.collapsedView}>
        <Divider style = {styles.divider} />
        <Text style = {styles.label}>Your service</Text>
        {
          serviceData.map(renderService)
        }
        <Icon name = {expand ? 'chevron-up' : 'chevron-down'} color = {theme.colours.gray5} containerStyle = {styles.expandIcon} onPress = {() => setExpand(!expand)}/>
      </View>
      <View style = {styles.availView}>
        <Divider style = {styles.divider} />
        <Text style = {styles.label}>Your availability</Text>
        {
          availData.map(renderAvail)
        }
      </View>
      <View>
        <Divider style = {styles.divider} />
        <Text style = {styles.label}>Your particulars</Text>
          <Text style = {styles.text}>Your email: {email}</Text>
          <Text style = {styles.text}>Your number: {number}</Text>
      </View>
      <PrimaryButton
        title = "Log Out"
        onPress = {() => logout()}
        containerStyle = {styles.logoutButtonContainer}
        buttonStyle = {styles.logoutButton}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colours.gray1,
    padding: theme.spacing.spacing3
  },
  header: {
    marginBottom: theme.spacing.spacing2
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: theme.colours.gray2,
  },
  carouselContainer: {
    height: 220,
    width: 240,
  },
  image: {
    height: 220,
    width: 220,
  },
  divider: {
    height: 2,
    backgroundColor: theme.colours.gray2,
    marginHorizontal: theme.spacing.spacing5,
    marginTop: theme.spacing.spacing0,
    marginBottom: theme.spacing.spacing4
  },
  label: {
    fontSize: 16,
    color: theme.colours.gray5,
    marginBottom: theme.spacing.spacing1
  },
  text: {
    lineHeight: 18,
    marginBottom: theme.spacing.spacing1
  },
  descriptionView: {
    marginTop: theme.spacing.spacing2
  },
  collapsedView: {
    height: 150
  },
  expandedView: {

  },
  expandIcon: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: 'rgba(247, 247, 247, 0.95)'
  },
  availView: {
    backgroundColor: theme.colours.gray1
  },
  logoutButtonContainer: {
    marginVertical: theme.spacing.spacing5,
    alignSelf: 'center'
  },
  logoutButton: {
    backgroundColor: theme.colours.primary
  }
})

export default index

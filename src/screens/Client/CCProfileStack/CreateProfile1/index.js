import React, { useState } from 'react'
import { View, StyleSheet, Image, SafeAreaView } from 'react-native'
import {Text, Input, Icon, BottomSheet } from 'react-native-elements'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import ImagePicker, { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker'

import colours from '../../../../styles/colours'
import PrimaryButton from '../../../../components/atoms/PrimaryButton'
import SecondaryButton from '../../../../components/atoms/SecondaryButton'
import GenderPicker from './GenderPicker'


import {ScrollView, TextInput, FlatList, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements/dist/list/ListItem'

// import BottomSheet from 'reanimated-bottom-sheet'
// import Animated from 'react-native-reanimated'

function index({navigation}) {
  const [childName, setChildName] = useState('')
  const [gender, setGender] = useState('')
  const [location, setLocation] = useState('')
  const [profileImage, setProfile] = useState([])

  const handleChoosePhoto = () => {
    const options= {}
    ImagePicker.launchImageLibrary(options, response => {
      console.log('response', response)
    })
  }

  const handleChangeLocation = () => {
    setLocation('Central')
  }




  {/** for the bottom sheet */}
  bs = React.createRef()
  fall = new Animated.Value(1)

  // const sheetRef = React.useRef(null)

  const renderContent = () => (
    <Text> Hello </Text>
  )

  // const renderHeader = () => (
  //   <View style={styles.header}>
  //   </View>

  // )

  const [isVisible, setIsVisible] = useState(false)
  const list = [
    {title: 'Upload from device'},
    {title: 'Take a photo'},
    {
      title: 'Cancel',
      containerStyle: {backgrounColor: 'red'},
      titleStyle: {color: 'white'},
      onPress: () => setIsVisible(false)
    }
  ]

  return (
    <View>
      {/** header */}
      <View>
        <Text h2> Create your profile </Text>
        <Text h4> Please provide your child's particulars: </Text>
      </View>

      {/** name input  and gender*/}
      <View>
        <TextInput 
            style={styles.input}
            placeholder="Name"
            onChangeText={childName => setChildName(childName)}
          />

        <TextInput 
            style={styles.input}
            placeholder="Gender (optional)"
            onChangeText={gender => setGender(gender)}
          />
      </View>

      {/**  DOB & location*/}
      <View>
        <TextInput 
            style={styles.input}
            placeholder="Date of birth"
            onChangeText={handleChangeLocation}
          />     

        <TextInput 
            style={styles.input}
            placeholder="Location "
            onChangeText={location => setLocation(location)}
          /> 

      </View>


      {/** profile photo */}
      <View>
        <Image 
          source= {require('../../../../assets/images/avatar.png')}
          style={styles.profileImg}/>

        <Icon
          name='photo-camera' 
          type='material-icons'
          size={24}
          color='#333'
          onPress={() => bs.current.snapTo(0)}
        />

      </View>

      <BottomSheet
          ref={bs}
          snapPoints={[200, 0]}
          // renderHeader={renderHeader}
          initialSnap={1} //initially its closed
          renderContent={renderContent}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />

        {/* <BottomSheet>
          {list.map((l, i) => (
            <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
              <ListItem.Content>
                <ListItem.Title> {l.title} </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet> */}

      {/** next button and bottom navigation */}

    </View>

    


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'flex-start', 
    justifyContent: 'center', 
    padding: 10
  },
  input: {
    borderWidth: 1,
    color: colours.gray6,
    fontSize: 14,
    fontFamily: 'roboto',
    width: 400
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  locationContainer: {
    marginTop: 20,
  }
})

export default index

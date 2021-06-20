import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Text, Divider, Icon } from 'react-native-elements'
import ImageCarousel from '../../../../components/atoms/ImageCarousel'
import PrimaryButton from '../../../../components/atoms/PrimaryButton'
import TertiaryButton from '../../../../components/atoms/TertiaryButton'
import theme from '../../../../styles/theme'

function ResultCard(props) {

  const [expand, setExpand] = useState(false)
  const [matched, setMatched] = useState(false)

  const locations = Object.values(props.provider.Responses[2])
  const days = Object.values(props.provider.Responses[3])
  const times = Object.values(props.provider.Responses[4])
  const experience = Object.values(props.provider.Responses[6])
  const photos = props.provider.images

  return (
    <View style = {styles.card}>
      {
        photos
          ? (
              <ImageCarousel
                itemHeight = {200}
                itemWidth = {200}
                carouselWidth = {220}
                data = {photos}
              />
            )
          : (
              <Avatar
                containerStyle = {styles.avatar}
                icon = {{name: 'user', color: theme.colours.gray5, type: 'feather'}}
                size = {200}
              />
            )
      }
      <Text h4Style = {styles.name} h4>{props.provider.name}</Text>
      <Text style = {styles.text}>{props.provider.description}</Text>
      {
        !expand && (
          <Icon name = "chevron-down" containerStyle = {styles.icon} onPress ={() => setExpand(true)}/>
        )
      }
      {
        expand && (
          <View>
            <Divider style = {styles.divider} />
            <Text style = {styles.text}>
              {
                locations.map((str, index) => {
                  if (index == locations.length - 1) {
                    return str
                  } else {
                    return str + ', '
                  }
                })
              }
            </Text>
            <Text style = {styles.text}>
              {
                days.map((str, index) => {
                  if (index == days.length - 1) {
                    return str
                  } else {
                    return str + ', '
                  }
                })
              }
            </Text>
            <Text style = {styles.text}>
              {
                times.map((str, index) => {
                  if (index == times.length - 1) {
                    return str
                  } else {
                    return str + ', '
                  }
                })
              }
            </Text>
            <Text style = {styles.text}>{experience[0]}</Text>
            <PrimaryButton
              containerStyle = {styles.buttonContainer}
              title = {matched ? <Icon name = 'check'/> : 'Match'}
              disabled = {matched}
              onPress = {() => {
                setMatched(true)
                props.onPress()
              }}
            />
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 320,
    backgroundColor: theme.colours.gray0,
    padding: theme.spacing.spacing3,
    marginBottom: theme.spacing.spacing4
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: theme.colours.gray2,
    marginBottom: theme.spacing.spacing3
  },
  divider: {
    height: 2,
    backgroundColor: theme.colours.gray2,
    marginHorizontal: theme.spacing.spacing3,
    marginTop: theme.spacing.spacing1,
    marginBottom: theme.spacing.spacing3
  },
  name: {
    marginBottom: theme.spacing.spacing1
  },
  text: {
    lineHeight: 18,
    marginBottom: theme.spacing.spacing1
  },
  icon: {
    width: 24,
    alignSelf: 'center'
  },
  buttonContainer: {
    marginTop: theme.spacing.spacing3,
    alignSelf: 'center'
  }
})

export default ResultCard

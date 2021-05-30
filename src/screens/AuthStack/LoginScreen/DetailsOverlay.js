import React from 'react'
import InfoOverlay from '../../../components/atoms/InfoOverlay'

function DetailsOverlay(props) {
  return (
    <InfoOverlay
      title = "What is Tribe?"
      text = "Tribe is a platform that connects caregivers of special needs children that are looking for services with professionals all over the country."
      onPress = {props.onPress}
      />
  )
}

export default DetailsOverlay

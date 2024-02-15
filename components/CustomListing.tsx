import { View, Text } from 'react-native'
import React from 'react'

interface Props{
    info:string
    navigation:string
    id:string

}

const CustomListItem = ({info,navigation,id}:Props) => {
  return (
    <View>
      <Text>CustomListing</Text>
    </View>
  )
}

export default CustomListItem
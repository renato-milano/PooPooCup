import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'

const MessageBox = ({image,text}) => {
  return (
<View className="rounded-3xl p-5 bg-light h-[20vh] w-full flex-row items-center">
            <Image className="w-[15vh] h-[20vh]" source={image}></Image>
            <Text className=" flex-1 text-base text-white  font-bregular">"{text}"</Text>
            </View>
  )
}

export default MessageBox

const styles = StyleSheet.create({})
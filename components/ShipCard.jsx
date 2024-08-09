import { View, Text,Image, SafeAreaView,TouchableOpacity} from 'react-native'
import React from 'react'
import {images} from "../constants"
import { router } from 'expo-router'

const ShipCard = ({post}) => {
    const getFormattedDate = (data) =>{
        var date = new Date(data);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        if (month<10){
            month='0'+month;
        }
        var year = date.getFullYear();
   
        return day + '\\' + month + '\\' + year;
  
    }
  return (
    <TouchableOpacity 
    onPress={()=>{
      const id= post.$id;
      const lin ='ship/'+id;
      console.log(id)
      router.setParams(id)
      router.push(lin)}
    }>
    <SafeAreaView className="flex-row justify-center items-center">
    <View className="w-[50px] h-[50px] rounded-lg">
    <Image source={{uri:post.users.avatar}} className="border-10 w-full h-full rounded-lg" resizeMode='cover'></Image>
    </View>
    <View className="p-1 flex-1 ">
      <Text className="font-pregular text-primary text-l">{post.title}</Text>
      <Text className="font-pregular text-m">{getFormattedDate(post.dateShip)}</Text>
      <Text className="font-pregular text-xs">{post.users.username}</Text>
    </View>
    
    </SafeAreaView>
    </TouchableOpacity>
  )
}

export default ShipCard
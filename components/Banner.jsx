import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React, {useEffect} from 'react'
import { icons, images } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../context/GlobalProvider'
import { getCurrentUser } from '../lib/appwrite'
import { router, usePathname } from 'expo-router'

const Banner = () => {
    const {user,isLoading,isLogged}= useGlobalContext()
    console.log(isLogged)
    useEffect(() => {
        if(isLoading){
        getCurrentUser();
        }
    }, [])
    const path = usePathname();
    console.log(path)
  return (
    
    <SafeAreaView className="px-2 py-2 bg-white">
        { !isLoading && isLogged ?
    <View className="items-center flex-row justify-between">
        <Image resizeMode="contain"
      className="h-[5vh] w-[5vh] rounded-xl"
      source={images.PooHappy}>
        </Image>
      <Text className="text-primary font-bregular text-2xl">The PooPoo Cup</Text>
      {user!=null ?
      <TouchableOpacity onPress={()=>{
        router.push('../profile/profile_detail')
      }}>
      <Image 
      resizeMode="contain"
      className="h-[5vh] w-[5vh] rounded-xl bg-white"
      source={{uri: user.avatar}}></Image>
      </TouchableOpacity>
    :null}
    </View>
      : null}
    </SafeAreaView>
  
  )
}

export default Banner

const styles = StyleSheet.create({})
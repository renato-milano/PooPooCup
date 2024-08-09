import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {logOut} from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router } from 'expo-router'

const profile = () => {
  const {isLoading,isLogged,setLogged,setUser}= useGlobalContext()
  const signOut= async()=>{
    await logOut().then(()=>{
      if(isLogged){  
      setUser(null)
    setLogged(false);
    console.log("logout finito")
    router.replace('(auth)/sign-in')
      }
  }
  );
    
  }
  return (
    <TouchableOpacity
    onPress={signOut()}>
    <View className="flex-1 items-center justify-center bg-white" >
      <Text>Sezione Profilo</Text>
    </View>
    </TouchableOpacity>
  )
}

export default profile

const styles = StyleSheet.create({})
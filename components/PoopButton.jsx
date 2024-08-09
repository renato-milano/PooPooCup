import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import { images } from '../constants'
import React, {useState, useEffect} from 'react'
import CustomButton from './CustomButton'
import MessageBox from './MessageBox'
import { SavePoop } from '../lib/appwrite'
import { useGlobalContext } from '../context/GlobalProvider'


const PoopButton = () => {
  const {isLoading,isLogged,user}= useGlobalContext();
  const [poopStatus, setPoopStatus] = useState(false);

  useEffect(() => {
    console.log(poopStatus)
  }, [])
  const PressedYes= async () =>{
  
    let success = await SavePoop(user)
    console.log(success)
    setPoopStatus(success);
  }
  return (
    <View className="rounded-xl flex-1 h-[10vh] items-center">
      {!poopStatus ? 
      <MessageBox image={images.PooSurprise} text={"Hey, come mai da queste parti? Aspetta, non dirmi che..."} ></MessageBox>
      :
      <MessageBox image={images.PooLove} text={"Ma è FANTASTICO! Aggiorno subito il tuo punteggio!"} ></MessageBox>
      }
      
      <TouchableOpacity onPress={PressedYes} className="items-center">
      <Image className="w-[30vh] h-[30vh]" resizeMode="contain" source={images.PooHappy}></Image>
      <Text className="text-xl font-bregular text-white">Tocca Poop se hai appena cagato! </Text>
      </TouchableOpacity>
    </View>
  )
}

export default PoopButton

const styles = StyleSheet.create({})
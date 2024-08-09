import { _View, FlatList, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import { RefreshControl } from 'react-native'
import { getAllPosts } from '../../lib/appwrite'
import NewsCard from '../../components/NewsCard'
import CustomButton from '../../components/CustomButton'
import PoopButton from '../../components/PoopButton'
import { useGlobalContext } from '../../context/GlobalProvider'
import { LinearGradient } from "expo-linear-gradient";

const home = () => {
  
  const {isLoading,isLogged,user}= useGlobalContext();

  const [data, setData] = useState([])

  
  return (
    <SafeAreaView className="h-full w-full bg-tekla1 px-5">
            <LinearGradient
        // Background Linear Gradient
        colors={["white", "transparent"]}
        style={styles.background}
      />
    <PoopButton></PoopButton>
    <View className=""></View>

    </SafeAreaView>
  )
}

export default home

const styles = StyleSheet.create({  container: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#D5BDAF",
},
background: {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  height: 600,
},})
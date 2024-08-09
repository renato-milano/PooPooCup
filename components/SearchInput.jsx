import { StyleSheet, Text, View, TextInput,TouchableOpacity,Image} from 'react-native'
import React , { useState } from 'react'
import { icons } from '../constants'



const SearchInput = ({title,value,placeholder,handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setshowPassword] = useState(false)
  return (
    <View className={`p-1 ${otherStyles}`}>
      <View className="rounded-xl w-full flex-row items-center h-16 px-4 bg-light focus:border-black space-x-4">
        <TextInput 
        className="flex-1 font-bsemibold"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="white"
        onChangeText={handleChangeText}
        secureTextEntry={title==='Password' ? true:false}
        />
        <TouchableOpacity>
        <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode='contain'/>
      </TouchableOpacity>
      </View>

    </View>
  )
}

export default SearchInput

const styles = StyleSheet.create({})
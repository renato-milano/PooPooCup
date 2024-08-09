import { StyleSheet, Text, View, Image, ScrollView, Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { register } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

import {images} from '../../constants'

const SignUp = () => {
  const { setUser, setLogged } = useGlobalContext();
    const [form, setForm] = useState({
        email:'',
        name:'',
        password:''
    })
    const [submitting, setSubmitting] = useState(false)

    const submit = async ()=>{
        if(!form.email || !form.password || !form.name){
          Alert.alert("Coglione","Non hai riempito tutti i campi...")
        }
        try {
          const result  = await register(form.email,form.password,form.name);
          setUser(result);
          setLogged(true);
          router.replace("/home")
        } catch (error) {
          console.log(error)
        }

    }
  return (
    <SafeAreaView className="h-full bg-primary">
        <ScrollView>
        <View className="w-full justify-center  min-h-[85vh] px-4 my-6">
        <Text className="text-3xl text-white text-center font-bsemibold my-2">Registrati Ora</Text>
        <View className="rounded-3xl bg-light w-full flex-row items-center">
            <Image className="w-[15vh] h-[15vh]" source={images.PooLove}></Image>
            <Text className=" flex-1 text-sm text-white text-centere font-bregular">"Ma cosa abbiamo qui?! Un nuovo sfidante che si unisce alla PooPoo Cup!?"</Text>
            </View>
            <FormField
            title="Username"
            value={form.name}
            handleChangeText={(e) => setForm({... form, name: e})}
            otherStyles="mt-7"
            />       
            <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({... form, email: e})}
            otherStyles="mt-7"
            keybordType="email-address"
            />        

            <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({... form, password: e})}
            otherStyles="mt-7"
            
            />        
        <CustomButton
            title="Registrati"
            containerStyles="mt-10"
            handlePress={submit}
        ></CustomButton>
        <Text className="mt-5 font-psemibold text-semibold text-l text-white">Hai già un account? <Link href="/sign-in">
        <Text className="text-secondary">Accedi</Text></Link></Text>
            </View>

        </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({})
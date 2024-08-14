import { StyleSheet, Text, View, Image, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";

import { images } from "../../constants";
import { getCurrentUser, login } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setLogged } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Coglione", "Non hai riempito tutti i campi...");
    }
    try {
      let check = await login(form.email, form.password);
      if (!check) {
        Alert.alert("Credenziali errate!");
        return;
      }
      const result = await getCurrentUser();
      setUser(result);
      setLogged(true);
      console.log(result);
      router.replace("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <View className="items-center justify-center">
            <Text className="text-3xl text-white text-center font-bsemibold my-2">
              La PooPoo Cup sta iniziando!
            </Text>
            <View className="rounded-3xl bg-light w-full flex-row items-center">
              <Image
                className="w-[15vh] h-[15vh]"
                source={images.PooHappy}
              ></Image>
              <Text className=" flex-1 text-sm text-white px-2 text-centere font-bregular">
                "Effettua l'accesso per partecipare alla grande competizione dei
                campioni!"
              </Text>
            </View>
          </View>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keybordType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Accedi"
            containerStyles="mt-10"
            handlePress={submit}
          ></CustomButton>
          <Text className="mt-5 font-bsemibold text-semibold text-l text-white">
            Non hai un account?{" "}
            <Link href="/sign-up">
              <Text style={{ color: "#e7bc91" }}>Creane uno</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});

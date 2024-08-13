import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MessageBox from "../components/MessageBox";
import CustomButton from "../components/CustomButton";
import React, { useState, useEffect } from "react";
import { images } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import Banner from "../components/Banner";
import { CreateRoom, JoinLega } from "../lib/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";
import { router } from "expo-router";

const NewLega = () => {
  const [CreateNew, setCreateNew] = useState(false);
  const [JoinNew, setJoinNew] = useState(false);
  const [NomeLega, setNomeLega] = useState("");
  const [CodiceLega, setCodiceLega] = useState("");
  const [NewRoom, setNewRoom] = useState([]);
  const [JustCreated, setJustCreated] = useState(false);
  const { isLoading, isLogged, user } = useGlobalContext();

  const SetNuova = () => {
    setCreateNew(true);
  };
  const JoinRoom = () => {
    setJoinNew(true);
  };

  const CreaLega = async () => {
    let created = await CreateRoom(user, NomeLega);
    console.log(created);
    setNewRoom(created);
    setCreateNew(false);
    setJustCreated(true);
  };

  const JoinNewLega = async () => {
    console.log(CodiceLega);
    let created = await JoinLega(user, CodiceLega);
    console.log(created);
    if (created) {
      router.replace("./(tabs)/explore");
    } else {
      Alert.alert("Errore", "Codice Errato");
    }
  };

  return (
    <SafeAreaView>
      <Banner></Banner>
      <View className="p-5">
        <LinearGradient
          // Background Linear Gradient
          colors={["white", "transparent"]}
          style={styles.background}
        />
        {JustCreated ? (
          <>
            <MessageBox
              image={images.PooHappy}
              text={"Perfetto! Ecco il codice della nuova lega!"}
            ></MessageBox>
            <View className="flex justify-center items-center p-5 my-10 bg-tekla5 rounded-xl">
              <Text selectable={true} className="text-primary text-3xl">
                {NewRoom.code}
              </Text>
            </View>
            <CustomButton
              handlePress={() => {
                router.replace("./(tabs)/explore");
              }}
              title={"Torna alle tue Lobby"}
            ></CustomButton>
          </>
        ) : null}
        {!CreateNew && !JoinNew && !JustCreated ? (
          <>
            <MessageBox
              image={images.PooHappy}
              text={
                "Vuoi creare una nuova lega della PooPooCup o partecipare con un link di invito?"
              }
            ></MessageBox>
            <View className="flex flex-row justify-center p-5">
              <CustomButton
                handlePress={SetNuova}
                containerStyles={"p-5 m-5 bg-primary"}
                title={"Crea Nuova"}
              ></CustomButton>
              <CustomButton
                handlePress={JoinRoom}
                containerStyles={"p-5 m-5"}
                title={"Partecipa"}
              ></CustomButton>
            </View>
          </>
        ) : null}
        {CreateNew && !JoinNew ? (
          <>
            <View className="flex justify-center">
              <MessageBox
                image={images.PooLove}
                text={
                  "Ottimo! Dai un nome alla tua nuova lega e preparati alla battaglia!"
                }
              ></MessageBox>
              <View className="flex flex-row justify-center p-5">
                <TextInput
                  className="bg-light font-bregular text-white text-xl px-10 py-5 rounded-xl"
                  onChangeText={(text) => setNomeLega(text)}
                  value={NomeLega}
                  placeholderTextColor={"white"}
                  placeholder="Inserisci il nome!"
                />
              </View>
              <CustomButton
                handlePress={CreaLega}
                title={"Sono pronto, crea!"}
              ></CustomButton>
            </View>
          </>
        ) : null}
        {!CreateNew && JoinNew ? (
          <>
            <View className="flex justify-center">
              <MessageBox
                image={images.PooLove}
                text={
                  "Ottimo! inserisci il codice della stanza per partecipare!"
                }
              ></MessageBox>
              <View className="flex flex-row justify-center p-5">
                <TextInput
                  className="bg-light font-bregular text-white text-xl px-10 py-5 rounded-xl"
                  onChangeText={(text) => setCodiceLega(text)}
                  value={CodiceLega}
                  placeholderTextColor={"white"}
                  placeholder="Inserisci il codice!"
                />
              </View>
              <CustomButton
                handlePress={JoinNewLega}
                title={"Sono pronto, entra!"}
              ></CustomButton>
            </View>
          </>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default NewLega;

const styles = StyleSheet.create({
  container: {
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
  },
});

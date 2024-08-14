import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import LobbyUpdate from "../../../components/LobbyUpdate";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { getRoomUpdates, SendUpdate } from "../../../lib/appwrite";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "../../../components/CustomButton";
import SearchInput from "../../../components/SearchInput";
import SendBox from "../../../components/SendBox";
import { icons } from "../../../constants";
const RoomStats = () => {
  const { idRoom: data } = useLocalSearchParams();
  const [isLoading, setisLoading] = useState(true);
  const [updates, setUpdates] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const { user } = useGlobalContext();
  const [message, setMessage] = useState("");
  //let message = "";
  const sendMessage = async () => {
    setisLoading(true);
    const messageToSend = {
      content: message,
      lobby: data,
      username: user.UserName,
      userID: user.$id,
    };
    let check = await SendUpdate(messageToSend);
    let Updates = await getRoomUpdates(data);
    setUpdates(Updates);
    setMessage("");
    Keyboard.dismiss();
    setisLoading(false);
  };
  const getStats = async () => {
    let Updates = await getRoomUpdates(data);
    setUpdates(Updates);
    setisLoading(false);
  };
  const UpdateMessage = () => {
    console.log(message);
    setMessage(message);
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsFocused(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsFocused(false);
      }
    );

    getStats();
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [data]);
  return (
    <SafeAreaView className="h-full w-full bg-tekla1 p-2">
      <LinearGradient
        // Background Linear Gradient
        colors={["white", "transparent"]}
        style={styles.background}
      />
      {updates != null ? (
        <View>
          <LobbyUpdate messages={updates}></LobbyUpdate>
          <View
            style={[
              styles.textInput,
              isFocused && styles.textInputFocused, // Applica lo stile quando il TextInput è selezionato
            ]}
            className="border border-yellow-900 rounded-xl w-full flex-row items-center h-16 px-4 bg-light space-x-4"
          >
            <TextInput
              className="flex-1 text-white font-bsemibold"
              value={message}
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={() => {
                setIsFocused(false);
              }}
              onChangeText={setMessage}
              placeholder={"Scrivi qui..."}
              placeholderTextColor="white"
            />
            <TouchableOpacity onPress={sendMessage}>
              <Image
                source={icons.rightArrow}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default RoomStats;

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
  textInput: {
    position: "relative", // Permette la modifica della posizione
  },
  textInputFocused: {
    position: "absolute", // Posiziona l'elemento in maniera assoluta
    bottom: Platform.OS === "ios" ? 200 : 200, // Sposta sopra la tastiera, variazione per iOS/Android
    left: 0,
    right: 0,
  },
});

import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PoopButton from "../../components/PoopButton";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getAllRoomsByUser } from "../../lib/appwrite";
import { images } from "../../constants";
import MessageBox from "../../components/MessageBox";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

const home = () => {
  const { user, isLogged } = useGlobalContext();
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      try {
        const response = await getAllRoomsByUser(user);
        setData(response);
      } catch (error) {
        Alert.alert("Errore", error.message);
      } finally {
        setisLoading(false);
      }
    };
    fetchData();
  }, []);
  const CreaNew = () => {
    router.push("explore");
  };
  const getIntroMessage = () => {
    if (user != null) {
      return (
        "Ciao " +
        user.UserName +
        "! Io sono 'Poop' e sarò il tuo compagnio di viaggio in questa nuova avventura!"
      );
    }
  };
  return (
    <SafeAreaView className="h-full w-full bg-tekla1 px-5">
      <LinearGradient
        // Background Linear Gradient
        colors={["white", "transparent"]}
        style={styles.background}
      />
      {!isLoading && data.length > 0 ? <PoopButton></PoopButton> : null}
      {!isLoading && data.length == 0 ? (
        <View>
          <Text className="text-center font-bsemibold text-3xl text-primary my-5">
            Finalmente sei dei nostri, {user.UserName}!
          </Text>
          <MessageBox
            image={images.PooLove}
            text={getIntroMessage()}
          ></MessageBox>

          <View className="mt-10">
            <Image
              className="h-[20vh] w-full"
              resizeMode="contain"
              source={images.AllPoops}
            ></Image>
            <Text className="text-center font-bsemibold text-2xl text-white my-5">
              Unisciti a Poop nella fantastica PooPooCup e fatti guidare fino
              alla vittoria!
            </Text>
            <CustomButton
              handlePress={CreaNew}
              containerStyles={"shadow-xl p-5 m-2"}
              title={"Vai alle tue leghe"}
            ></CustomButton>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default home;

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

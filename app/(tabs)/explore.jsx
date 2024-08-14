import { StyleSheet, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { getAllRooms, getAllRoomsByUser } from "../../lib/appwrite";
import RoomCard from "../../components/RoomCard";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import MessageBox from "../../components/MessageBox";
import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";

const explore = () => {
  const { user } = useGlobalContext();
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
    router.push("../NewLega");
  };
  const reloadContent = async () => {
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

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    reloadContent();
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="px-2 bg-tekla1 h-full">
      <LinearGradient
        // Background Linear Gradient
        colors={["white", "transparent"]}
        style={styles.background}
      />
      {!isLoading && data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <View className="p-2">
              <RoomCard room={item}></RoomCard>
            </View>
          )}
          ListHeaderComponent={() => (
            <View>
              <Text className="px-2 font-bregular text-2xl text-primary">
                Le tue Leghe
              </Text>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : null}
      {!isLoading && data.length == 0 ? (
        <View className="flex-1 justify-center items-center p-2">
          <MessageBox
            image={images.PooSad}
            text={
              "Sembra che tu non sia ancora in nessuna lega, clicca in basso per crearla o aggiungerti ad una esistente!"
            }
          ></MessageBox>
        </View>
      ) : null}
      <CustomButton
        handlePress={CreaNew}
        containerStyles={"shadow-xl p-5 m-5"}
        title={"Nuova Lega"}
      ></CustomButton>
    </SafeAreaView>
  );
};

export default explore;

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

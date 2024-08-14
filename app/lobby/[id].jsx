import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getRoomBoard, getRoomByID, getRoomUpdates } from "../../lib/appwrite";

import MessageBox from "../../components/MessageBox";
import RoomBoard from "../../components/RoomBoard";
import LobbyUpdate from "../../components/LobbyUpdate";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "../../components/CustomButton";
import { images } from "../../constants";

const Lobby = () => {
  const { id: data } = useLocalSearchParams();
  const [room, setRoom] = useState(null);
  const [board, setBoard] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  const goToUpdates = () => {
    const idRoom = room.$id;
    console.log(idRoom);
    router.setParams({ idRoom: room.$id });
    router.push({
      pathname: "./update/" + room.$id,
      params: { idRoom: room.$id },
    });
  };
  const getRoom = async () => {
    if (room == undefined) {
      let room = await getRoomByID(data);
      let Board = await getRoomBoard(room.usersArray, room.$createdAt);
      setRoom(room);
      setBoard(Board);
      setisLoading(false);
    }
  };

  useEffect(() => {
    getRoom();
  });

  return (
    <SafeAreaView className="h-full w-full bg-tekla1 p-2">
      <LinearGradient
        // Background Linear Gradient
        colors={["white", "transparent"]}
        style={styles.background}
      />
      {!isLoading ? (
        <View>
          <View className="h-[55vh]">
            <RoomBoard board={board}></RoomBoard>
          </View>
          <View className="mt-5">
            <CustomButton
              handlePress={goToUpdates}
              title={"Chat della Lobby"}
            ></CustomButton>
          </View>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center p-2">
          <MessageBox
            image={images.PooHappy}
            text={"Carico la lobby."}
          ></MessageBox>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Lobby;

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

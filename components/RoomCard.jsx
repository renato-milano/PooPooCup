import { View, Text, Image, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { icons, images } from "../constants";
import { getRoomMembers, getRoomUser } from "../lib/appwrite";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const RoomCard = ({ room }) => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      try {
        console.log(room.usersArray);
        const response = await getRoomMembers(room.usersArray);
        setData(response);
      } catch (error) {
        Alert.alert("Errore", error.message);
      } finally {
        setisLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-row justify-center items-center">
      {!isLoading ? (
        <TouchableOpacity
          className="w-full bg-tekla2 my-2 px-2 rounded-xl flex-row items-center"
          onPress={() => {
            console.log(room.$id);
            const id = room.$id;
            router.setParams(id);
            router.push("lobby/" + room.$id);
          }}
        >
          <View className="w-[50px] h-[50px] rounded-lg">
            <Image
              source={images.PooConfused}
              className="border-10 w-full h-full rounded-lg"
              resizeMode="cover"
            ></Image>
          </View>
          <View className="p-1 flex-1">
            <Text className="font-bregular text-xl text-white">
              {room.title}
            </Text>
            <Text className="font-bregular text-light text-m">
              {data.join(", ").slice(0, 24) + "..."}
            </Text>
          </View>
          <Image
            className="mx-2"
            resizeMethod="contain"
            source={icons.rightArrow}
          ></Image>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};

export default RoomCard;

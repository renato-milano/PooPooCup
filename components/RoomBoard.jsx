import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import MessageBox from "./MessageBox";
import images from "../constants/images";

const RoomBoard = ({ board }) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    //Fingiamo che carichi
    setRefreshing(false);
  };

  const getBg = (index) => {
    switch (index) {
      case 0:
        return "bg-amber-200";
      case 1:
        return "bg-gray-200";
      case 2:
        return "bg-yellow-600";
      default:
        return "bg-white";
        break;
    }
  };
  getPooPosition = (index) => {
    switch (index) {
      case 0:
        return (
          <Image
            style={{ width: 40, height: 40 }}
            source={images.PooGold}
          ></Image>
        );
      case 1:
        return (
          <Image
            style={{ width: 40, height: 40 }}
            source={images.PooSilver}
          ></Image>
        );
      case 2:
        return (
          <Image
            style={{ width: 40, height: 40 }}
            source={images.PooBronze}
          ></Image>
        );
      default:
        return (
          <Image
            style={{ width: 40, height: 40 }}
            source={images.PooHappy}
          ></Image>
        );
        break;
    }
  };
  return (
    <FlatList
      data={board}
      keyExtractor={(item, index) => index}
      renderItem={({ item, index }) => (
        <View
          className={
            "flex-row items-center my-2 justify-between p-2 rounded-xl " +
            getBg(index)
          }
        >
          <View className="flex-row items-center">
            <Text className="font-bregular text-left  text-primary">
              {index + 1}
            </Text>
            {getPooPosition(index)}
          </View>
          <View className="flex-1 justify-center text-start">
            <Text className="font-bregular text-left text-xl text-primary">
              {item.user.UserName}
            </Text>
          </View>

          <Text className="font-bregular  text-xl text-primary">
            {item.total}
          </Text>
        </View>
      )}
      ListHeaderComponent={() => (
        <View>
          <Text className="text-2xl font-bregular text-primary text-center">
            Classifica
          </Text>
          <View className="bg-transparent flex-row justify-between p-3">
            <Text className="font-bregular text-xl text-primary">Pos.</Text>

            <Text className="font-bregular text-xl text-primary">Pooper</Text>

            <Text className="font-bregular text-xl text-primary">Tot.</Text>
          </View>
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default RoomBoard;

const styles = StyleSheet.create({});

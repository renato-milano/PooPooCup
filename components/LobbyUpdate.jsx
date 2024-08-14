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
import { useGlobalContext } from "../context/GlobalProvider";

const LobbyUpdate = ({ messages }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useGlobalContext();
  const onRefresh = async () => {
    setRefreshing(true);

    setRefreshing(false);
  };
  const WhoSended = (username) => {
    if (username == user.UserName) {
      return "ml-[15vh] bg-white";
    } else if (username == "Poop") {
      return "justify-center bg-amber-200";
    } else {
      return "bg-white";
    }
  };
  const formatDateString = (dateString) => {
    const date = new Date(dateString);

    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}.${minutes}`;
  };
  return (
    <>
      <View>
        <Text className="text-2xl font-bregular text-primary text-center">
          Ultimi Aggiornamenti
        </Text>
      </View>
      <FlatList
        className="h-[85vh]"
        data={messages}
        inverted={true}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => (
          <View
            className={
              "flex w-[30vh] text-left p-2 rounded-xl my-2 p-2 " +
              WhoSended(item.senderUserName)
            }
          >
            <View className="flex-row justify-between">
              <Text className="font-bregular text-primary">
                {item.senderUserName}
              </Text>
              <Text className="font-bregular text-sm text-primary">
                {formatDateString(item.$createdAt)}
              </Text>
            </View>
            <Text className="font-bregular text-black">{item.message}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </>
  );
};

export default LobbyUpdate;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import SearchInput from "../../components/SearchInput";
import { Alert } from "react-native";
import { getAllRooms } from "../../lib/appwrite";
import RoomCard from "../../components/RoomCard";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

const explore = () => {
  const CreaNew = () => {
    router.push("../NewLega");
  };
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      try {
        const response = await getAllRooms();
        setData(response);
      } catch (error) {
        Alert.alert("Errore", error.message);
      } finally {
        setisLoading(false);
      }
    };
    fetchData();
  }, []);

  const reloadContent = async () => {
    setisLoading(true);
    try {
      const response = await getAllRooms();
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
      {!isLoading ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <RoomCard room={item}></RoomCard>}
          ListHeaderComponent={() => (
            <View>
              <Text className="font-bregular text-2xl text-primary">
                Le tue Leghe
              </Text>
              <SearchInput placeholder="Cerca tra le leghe..." />
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : null}
      <CustomButton
        handlePress={CreaNew}
        containerStyles={"p-5 m-5"}
        title={"+ Nuova Lega"}
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

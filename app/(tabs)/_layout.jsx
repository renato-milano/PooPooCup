import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";
import Banner from "../../components/Banner";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-1">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-bsemibold" : "font-bregular"} tex-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Banner></Banner>
      <Tabs
        className=""
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: "#99582A",
          tabBarInactiveTintColor: "#E3D5CA",
          tabBarStyle: {
            backgroundColor: "transparent", // Imposta la tab bar trasparente
            borderTopWidth: 0, // Rimuovi il bordo superiore (se presente)
            elevation: 0, // Rimuovi l'ombra su Android
            shadowOpacity: 0, // Rimuovi l'ombra su iOS
            height: 60,
          },
          tabBarOptions: {
            showIcon: true,
            showLabel: false,
            lazyLoad: true,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            unmountOnBlur: true,
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              ></TabIcon>
            ),
          }}
        ></Tabs.Screen>

        <Tabs.Screen
          name="explore"
          options={{
            title: "explore",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Le mie Leghe"
                focused={focused}
              ></TabIcon>
            ),
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="profile"
          options={{
            title: "profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Log Out"
                focused={focused}
              ></TabIcon>
            ),
          }}
        ></Tabs.Screen>
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});

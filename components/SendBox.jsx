import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const SendBox = ({
  title,
  value,
  placeholder,
  handleChangeText,
  operationOnClick,
  otherStyles,
  ...props
}) => {
  return <View className={`p-1 ${otherStyles}`}></View>;
};

export default SendBox;

const styles = StyleSheet.create({});

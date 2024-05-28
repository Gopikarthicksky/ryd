import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTime from "./DateTime";
import { useNavigation } from "@react-navigation/native";

const MainLogic = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("CIEC");

  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const navigation = useNavigation();

  return (
    <View style={MainLogicStyles.container}>
      <View style={MainLogicStyles.box}>
        <View style={MainLogicStyles.fromLocation}>
          <TextInput
            style={MainLogicStyles.input}
            value={fromLocation}
            onChangeText={setFromLocation}
            placeholder="From Location"
            onPress={() => navigation.navigate("FromLocation")}
          />
        </View>
        <View style={MainLogicStyles.toLocation}>
          <TextInput
            style={MainLogicStyles.input}
            value={toLocation}
            onChangeText={setToLocation}
            placeholder="CIEC"
          />
        </View>
        <Ionicons
          name="swap-vertical"
          size={25}
          color="white"
          onPress={swapLocations}
          style={{
            bottom: "32%",
            backgroundColor: "#61677A",
            borderRadius: 20,
            width: 40,
            height: 40,
            textAlign: "center",
            padding: 7,
            left: "30%",
          }}
        />
        <DateTime />
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate("Search");
        }}
        style={{
          backgroundColor: "black",
          width: 200,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          bottom: "7%",
        }}>
        <Text style={{ color: "white" }}>Search Rides</Text>
      </Pressable>
    </View>
  );
};

export default MainLogic;

const MainLogicStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    width: "60%",
    height: "33%",
    left: "19%",
    top: "15%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "grey",
    position: "fixed",
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  box: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: "5%",
  },
  time: {
    bottom: "20%",
  },
});

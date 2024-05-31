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

const MainLogic = ({sLocation}) => {
  console.log(sLocation, "user from Search From HomePage.js");
  const [fromLocation, setFromLocation] = useState(sLocation);
  const [toLocation, setToLocation] = useState("CIEC");
  console.log(sLocation, '<----------- main lOoooooooooooooooo')

  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const demoSearch = (res) =>{
    
    fetch('http://localhost:3000/search', {})
    console.log("Searching for rides");
  }

  const navigation = useNavigation();

  return (
    <View style={MainLogicStyles.container}>
      <View style={MainLogicStyles.box}>
        <View style={MainLogicStyles.fromLocation}>
          <TextInput
            style={MainLogicStyles.input}
            value={sLocation}
            onChangeText={setFromLocation}
            placeholder="CIEC"
            onPress={() => navigation.navigate("FromLocation")}
          />
        </View>
        <View style={MainLogicStyles.toLocation}>
          <TextInput
            style={MainLogicStyles.input}
            value={sLocation}
            onChangeText={setToLocation}
            placeholder="CIEC"
            onPress={() => navigation.navigate("ToLocation")}
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
        onPress={(res) => {
          demoSearch(res);
          navigation.navigate("SearchResult");
        }}
        style={{
          backgroundColor: "#16ACDB",
          width: 100,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          // position: 'absolute',
          // left: 60,
          top: "1%",
        }}>
        <Text style={{ color: "white" }}>Search Rides</Text>
      </Pressable>
      <Text style={{ paddingTop: 10 }}>or</Text>
      <Pressable
        style={{
          backgroundColor: "white",
          width: 400,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          // position: 'relative',
          // right: 60,
          bottom: "0%",
        }}
         onPress={() => navigation.navigate("CreateRides")}
        >
        <Text style={{ color: "black", textDecorationLine: "underline" }}>Click here to create rides</Text>
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

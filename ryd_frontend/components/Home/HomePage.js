import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import WeatherDisplay from "./Header/WeatherDisplay";
import Ionicons from "@expo/vector-icons/Ionicons";
import MainLogic from "./Main/MainLogic";
import BottomNavBar from "./BottomNavBar/BottomNavBar";

const HomePage = ({ navigation }) => {
  return (
    <View style={HomePageStyles.container}>
      <Image
        source={require("../../assets/images/home_page_bg.png")}
        style={HomePageStyles.homeBg}
        contentFit="contain"
      />
      <View style={HomePageStyles.header}>
        <View style={HomePageStyles.headerNavBar}>
          <WeatherDisplay style={HomePageStyles.weatherDisplay} />
          <Ionicons
            name="person-circle-outline"
            size={40}
            color="white"
            style={HomePageStyles.profileIcon}
            onPress={() => {
              navigation.navigate("Profile");
            }}
          />
          <Ionicons name="notifications-outline" size={40} color="white" />
        </View>
        <View style={HomePageStyles.description}>
          <Text style={HomePageStyles.title}>Ryd.</Text>
          <Text style={HomePageStyles.subtitle}>to ?</Text>
        </View>
      </View>
      <MainLogic />
      <BottomNavBar />
    </View>
  );
};

const HomePageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 16,
    backgroundColor: "white",
    position: "fixed",
  },
  header: {
    flexDirection: "column",
    width: "100%",
    left: "15%",
  },
  headerNavBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    top: "25%",
  },
  profileIcon: {
    left: "110%",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    top: "85%",
  },
  subtitle: {
    fontSize: 48,
    fontWeight: "bold",
    top: "85%",
  },
  homeBg: {
    position: "absolute",
    height: "49%",
    width: "125%",
    left: "-1%",
    top: "4.5%",
    zIndex: -1,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
  },
});

export default HomePage;

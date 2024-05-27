import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const HomePage = ({ navigation }) => {
  return (
    <View style={HomePageStyles.container}>
      <Image
        source={require("../../assets/images/home_page_bg.png")}
        style={HomePageStyles.homeBg}
        contentFit="contain"
      />
      <Text style={HomePageStyles.title}>Welcome to CarPool App</Text>
      <Text style={HomePageStyles.description}>
        Share rides with people traveling in the same direction.
      </Text>
    </View>
  );
};

const HomePageStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  homeBg: {
    position: "absolute",
    height: "45%",
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

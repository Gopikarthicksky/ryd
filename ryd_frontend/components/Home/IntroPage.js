import React from "react";
import { Image } from "expo-image";
import { View, Text, StyleSheet, Pressable } from "react-native";

const IntroPage = ({ navigation }) => {
  return (
    <View style={IntroPageStyles.container}>
      <Image
        source={require("../../assets/images/home_page_bg.png")}
        style={IntroPageStyles.homeBg}
        contentFit="contain"
      />
      <Text style={IntroPageStyles.title}>Ryd.</Text>
      <Text style={IntroPageStyles.subTitle}>A CIEC Product</Text>
      <View style={IntroPageStyles.intro}>
        <Text style={IntroPageStyles.bottomTitle}>How it works</Text>
        <Text style={IntroPageStyles.bottomTitleDescription}>
          When you ride together you help reduce traffic {"\n"}and you also cut
          back costs on gas.
        </Text>

        <View styles={IntroPageStyles.featuresDescription}>
          <View style={IntroPageStyles.feature1}>
            <View style={IntroPageStyles.circle1}>
              <Text style={IntroPageStyles.textCircle1}>1</Text>
            </View>
            <View style={IntroPageStyles.feature1Details}>
              <Text style={IntroPageStyles.feature1Title}>
                Search for a ride
              </Text>
              <Text style={IntroPageStyles.feature1Description}>
                Select the destination and ride along {"\n"}with your CIEC
                collegues.
              </Text>
            </View>
          </View>
          <View style={IntroPageStyles.feature2}>
            <View style={IntroPageStyles.circle2}>
              <Text style={IntroPageStyles.textCircle2}>2</Text>
            </View>
            <View style={IntroPageStyles.feature2Details}>
              <Text style={IntroPageStyles.feature2Title}>
                Ask the driver to join
              </Text>
              <Text style={IntroPageStyles.feature2Description}>
                Ping your driving CIEC collegue to {"\n"}accept your travel
                request
              </Text>
            </View>
          </View>
          <View style={IntroPageStyles.feature3}>
            <View style={IntroPageStyles.circle3}>
              <Text style={IntroPageStyles.textCircle3}>3</Text>
            </View>
            <View style={IntroPageStyles.feature3Details}>
              <Text style={IntroPageStyles.feature3Title}>Enjoy!</Text>
              <Text style={IntroPageStyles.feature3Description}>
                You are now all set to start your ride{"\n"}to the CIEC
              </Text>
            </View>
          </View>
          <Pressable
            style={IntroPageStyles.button}
            onPress={() => navigation.navigate("Home")}>
            <Text style={IntroPageStyles.loginText}>Got it</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const IntroPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    position: "absolute",
    fontSize: 48,
    fontWeight: "bold",
    top: "12%",
    right: "16%",
    color: "white",
  },
  homeBg: {
    position: "absolute",
    height: "50%",
    width: "125%",
    left: "-6%",
    top: "1%",
  },
  subTitle: {
    position: "absolute",
    fontSize: 12,
    fontWeight: "bold",
    top: "43%",
    right: "70%",
    color: "white",
  },
  intro: {
    flexDirection: "column",
    top: "4%",
  },
  bottomTitle: {
    color: "black",
    fontSize: 38,
    fontWeight: "500",
    top: "35%",
  },
  bottomTitleDescription: {
    color: "black",
    fontSize: 16,
    top: "40%",
  },
  featuresDescription: {
    flexDirection: "column",
  },
  feature1: {
    flexDirection: "column",
    top: "25%",
  },
  feature1Details: {
    flexDirection: "column",
    left: "20%",
    top: "45%",
  },
  feature1Title: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  circle1: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth: 1.5,
    borderColor: "black",
    top: "95%",
  },
  textCircle1: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    top: "5%",
  },
  feature2: {
    top: "41%",
    flexDirection: "row",
  },
  feature2Details: {
    flexDirection: "column",
    left: "28%",
  },
  feature2Title: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  circle2: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth: 1.5,
    borderColor: "black",
    top: "1%",
  },
  textCircle2: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    top: "3%",
    transform: [{ rotate: "-13deg" }],
  },
  feature3: {
    top: "48%",
    flexDirection: "row",
  },
  feature3Details: {
    flexDirection: "column",
    left: "33%",
  },
  feature3Title: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  circle3: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth: 1.5,
    borderColor: "black",
    top: "1%",
  },
  textCircle3: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    top: "3%",
    transform: [{ rotate: "11deg" }],
  },
  button: {
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 2,
    textAlign: "center",
    padding: 10,
    top: "75%",
    left: "25%",
    justifyContent: "center",
    width: "50%",
    height: 40,
  },
  loginText: {
    color: "black",
    textAlign: "center",
    bottom: "5%",
    right: "2%",
  },
});

export default IntroPage;

import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const ProfileInfoPage = ({ navigation }) => {
  return (
    <View style={ProfileInfoPageStyles.container}>
      <Text style={ProfileInfoPageStyles.title}>Profile</Text>
      <Text style={ProfileInfoPageStyles.name}>Paari A</Text>
      <Text style={ProfileInfoPageStyles.email}>
        Email ID : paari.a@comcast.com
      </Text>
      <Text style={ProfileInfoPageStyles.email}>Employee ID : 10471101</Text>
      <Text style={ProfileInfoPageStyles.email}>Ph.No : +918870166755</Text>
      <Text style={ProfileInfoPageStyles.email}>Gender : Male</Text>
      <Pressable style={ProfileInfoPageStyles.button}>
        <Text style={ProfileInfoPageStyles.signUpText}>Update Profile</Text>
      </Pressable>
    </View>
  );
};

const ProfileInfoPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    marginBottom: 20,
    fontWeight: "500",
    right: "21%",
  },
  button: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    textAlign: "center",
    justifyContent: "center",
    width: "50%",
  },
});

export default ProfileInfoPage;

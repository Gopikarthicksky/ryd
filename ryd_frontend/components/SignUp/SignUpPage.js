import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import CheckBox from "expo-checkbox";

const SignUpPage = ({ navigation }) => {
  const [emailId, setEmailId] = useState("");
  const [empId, setEmpId] = useState("");
  const [mobNum, setMobNum] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSelected, setSelection] = useState(false);

  const handleSubmit = () => {
    const emailIdPattern = /^[a-zA-Z0-9._%+-]+@comcast\.com$/;
    if (!emailIdPattern.test(emailId)) {
      Alert.alert("Invalid email", "Enter your Comcast email ID");
    }
    const mobNumPattern = /^[0-9]\d{9}$/;
    if (!mobNumPattern.test(mobNum)) {
      Alert.alert("Invalid phone number", "Enter a valid phone number");
    }
    const empIdPattern = /^[0-9]\d{7}$/;
    if (!empIdPattern.test(empId)) {
      Alert.alert("Invalid phone number", "Enter a valid employee ID");
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
    }
    if (!isSelected) {
      Alert.alert("Please agree to the terms and conditions");
    }
    if (
      emailId.trim() === "" ||
      empId.trim() === "" ||
      mobNum.trim() === "" ||
      password.trim() === ""
    ) {
      Alert.alert("Error", "All the fields must be filled");
    }
  };

  return (
    <View style={SignUpPageStyles.container}>
      <Text style={SignUpPageStyles.title}>Sign Up</Text>
      <TextInput
        style={SignUpPageStyles.input}
        placeholder="Comcast Email ID"
        value={emailId}
        onChangeText={setEmailId}
      />
      <TextInput
        style={SignUpPageStyles.input}
        placeholder="Employee ID"
        value={empId}
        onChangeText={setEmpId}
        keyboardType="phone-pad"
        maxLength={8}
      />
      <TextInput
        style={SignUpPageStyles.input}
        placeholder="Mobile Number"
        value={mobNum}
        onChangeText={setMobNum}
        keyboardType="phone-pad"
        maxLength={10}
      />
      <TextInput
        style={SignUpPageStyles.input}
        placeholder="Create Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={SignUpPageStyles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <View style={SignUpPageStyles.terms}>
        <CheckBox value={isSelected} onValueChange={setSelection} />
        <TouchableOpacity onPress={() => setSelection(!isSelected)}>
          <Text style={SignUpPageStyles.label}>
            I agree to all the terms and conditions
          </Text>
        </TouchableOpacity>
      </View>
      <Pressable
        style={SignUpPageStyles.button}
        onPress={() => {
          handleSubmit();
          navigation.navigate("Login");
        }}>
        <Text style={SignUpPageStyles.signUpText}>Create Profile</Text>
      </Pressable>
    </View>
  );
};

const SignUpPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 48,
    marginBottom: 20,
    fontWeight: "500",
    right: "21%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 25,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: "87%",
    fontWeight: "600",
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
  signUpText: {
    color: "white",
    textAlign: "center",
  },
  terms: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    margin: 8,
    fontWeight: "500",
  },
});

export default SignUpPage;

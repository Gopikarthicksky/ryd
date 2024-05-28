import React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

const LoginPage = ({ navigation }) => {
  const [emailId, setEmailId] = React.useState("");
  const [empId, setEmpId] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    // Add your login logic here
  };

  return (
    <View style={LoginPageStyles.container}>
      <Text style={LoginPageStyles.title}>Ryd.</Text>
      <TextInput
        style={LoginPageStyles.input}
        placeholder="Comcast Email ID"
        value={emailId}
        onChangeText={setEmailId}
      />
      <TextInput
        style={LoginPageStyles.input}
        placeholder="Employee ID"
        value={empId}
        onChangeText={setEmpId}
      />
      <TextInput
        style={LoginPageStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Pressable style={LoginPageStyles.fpButton}>
        <Text style={LoginPageStyles.fpText}>Forgot Password ?</Text>
      </Pressable>
      <Pressable
        style={LoginPageStyles.button}
        onPress={() => navigation.navigate("Intro")}>
        <Text style={LoginPageStyles.loginText}>Login</Text>
      </Pressable>
      <Text style={{ paddingTop: 10 }}>or</Text>
      <Pressable>
        <Text
          style={{ paddingTop: 10, fontWeight: "bold" }}
          onPress={() => navigation.navigate("SignUp")}>
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
};

const LoginPageStyles = StyleSheet.create({
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
    textAlign: "center",
    fontWeight: "bold",
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
    textAlign: "center",
    justifyContent: "center",
    width: "50%",
  },
  loginText: {
    color: "white",
    textAlign: "center",
  },
  fpButton: {
    paddingLeft: "55%",
    paddingBottom: 25,
  },
  fpText: {
    fontWeight: "bold",
  },
});

export default LoginPage;

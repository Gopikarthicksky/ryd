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
import DropDownPicker from "react-native-dropdown-picker";
import DateTime from "/Users/mae312/ryd/ryd_frontend/components/Browse/Create/DateTime.js";

const getRideDetails = () => {
  return {
    origin,
    drop,
    startingtime,
    gender,
    passengers,
    vehicle,
    isSelected
  };
};

const CreateRides = ({ navigation }) => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("CIEC");

  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const [origin, setorigin] = useState("");
  const [drop, setdrop] = useState("");
  const [startingtime, setTime] = useState("");
  const [gender, setGender] = useState("");
  const [passengers, setseater] = useState("");
  const [vehicle, setvehicletype] = useState("");
  const [isSelected, setSelection] = useState(false);

  const handleSubmit = () => {
    if (!isSelected) {
      Alert.alert("Please agree to the terms and conditions");
      return false
    }
    if (
      origin.trim() === "" ||
      drop.trim() === "" ||
      vehicle.trim() === ""
         ) {
      Alert.alert("Error", "All the fields must be filled");
      return false
    }
    return true
  };

  return (
    <View style={SignUpPageStyles.container}>
      <Text style={SignUpPageStyles.title}>      Create Ride</Text>
      <TextInput
        style={SignUpPageStyles.input}
        placeholder="Origin"
        value={origin}
        onChangeText={setorigin}
        onPress={() => navigation.navigate("FromLocation")}
      />
      <TextInput
        style={SignUpPageStyles.input}
        placeholder="Drop"
        value={drop}
        onChangeText={setdrop}
        keyboardType="phone-pad"
      />
      <DateTime 
      style={{
          backgroundColor: "white",
          borderColor: "blue",
          borderRadius: 0,
          top:"20%"
        }}/>
      <DropDownPicker
        items={[
          { label: "Male", value: "M" },
          { label: "Female", value: "F" },
          { label: "Others", value: "O" },
        ]}
        defaultValue={gender}
        placeholder="Ride Creater Gender"
        placeholderStyle={{ color: "grey" }}
        containerStyle={{
          height: 40,
          width: "87%",
          marginBottom: 20,
        }}
        itemSeparator={true}
        separatorStyle={{ height: 1, backgroundColor: "black" }}
        style={{
          backgroundColor: "white",
          borderColor: "black",
          borderRadius: 10,
        }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        labelStyle={{
          color: "black",
        }}
        dropDownStyle={{
          backgroundColor: "#fafafa",
          borderColor: "black",
          borderRadius: 10,
        }}
        onChangeItem={(item) => setGender(item.value)}
      />
      <TextInput
        style={SignUpPageStyles.input}
        placeholder="Vehicle type"
        value={vehicle}
        onChangeText={setvehicletype}
      />
      <DropDownPicker
        items={[
          { label: "2 Seater", value: "2" },
          { label: "3 Seater", value: "3" },
          { label: "4 Seater", value: "4" },
        ]}
        placeholder="Passengers"
        placeholderStyle={{ color: "grey" }}
        containerStyle={{
          height: 40,
          width: "87%",
          marginBottom: 20,
        }}
        itemSeparator={true}
        separatorStyle={{ height: 1, backgroundColor: "black" }}
        style={{
          backgroundColor: "white",
          borderColor: "black",
          borderRadius: 10,
        }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        labelStyle={{
          color: "black",
        }}
        dropDownStyle={{
          backgroundColor: "#fafafa",
          borderColor: "black",
          borderRadius: 10,
        }}
        onChangeItem={(item) => setseater(item.value)}
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
          if (handleSubmit())  {
            navigation.navigate("Ridecreation");
          }
        }}>
        <Text style={SignUpPageStyles.signUpText}>Create Ride</Text>
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
    backgroundColor: "#B3E8F9",
  },
  title: {
    fontSize: 48,
    marginBottom: 20,
    fontWeight: "500",
    right: "21%",
    color: "#084458",
  },
  input: {
    height: 40,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 1,
    marginBottom: 25,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: "87%",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#0D5971",
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

export default CreateRides;

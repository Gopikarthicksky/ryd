import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { debounce } from "lodash";

const SearchFromLocation = ({ navigation }) => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = debounce((term) => {
    axios
      .get(`https://api.example.com/search?q=${term}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, 300);

  const handleSearch = () => {
    const rides = ["Adyar", "Anna Nagar", "Koyambedu", "Tambaram", "Porur"];
    const filteredRides = rides.filter((ride) => ride.includes(term));

    setResults(filteredRides);
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="arrow-back-outline"
        size={25}
        color="grey"
        onPress={() => navigation.navigate("Home")}
        style={{ position: "absolute", top: 17, left: 18, zIndex: 1 }}
      />
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          value={term}
          onChangeText={(text) => {
            setTerm(term);
            setSearchTerm(text);
            fetchData(searchTerm);
          }}
          placeholder="Select the boarding point"
        />
        <Pressable onPress={handleSearch} style={{ top: 7 }}>
          <Ionicons name="search" size={25} color="grey" />
        </Pressable>
      </View>
      <View style={styles.listResults}>
        <FlatList
          data={results}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                console.log(item);
                navigation.navigate("Home");
              }}>
              <Text style={{ marginBottom: 15, fontSize: 16 }}>{item}</Text>
              <View
                style={{
                  flex: 1,
                  width: 300,
                  height: 1,
                  backgroundColor: "grey",
                }}
              />
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: "white",
  },
  searchBar: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
  },
  searchInput: {
    paddingLeft: 50,
    flex: 1,
    marginRight: 10,
    padding: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
  },
  listResults: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default SearchFromLocation;

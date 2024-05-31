import React, { useState} from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { debounce } from "lodash";
import { useRoute } from '@react-navigation/native';


const SearchToLocation = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const route = useRoute();

  const fetchData = debounce(() => {
    axios
      .get(`http://10.126.55.177:8000/location_autocomplete/?q=${searchTerm}`)
      .then((response) => {
        setData(response.data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        console.error("Error details: ", error.response);
      });
  }, 300);

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
          value={searchTerm}
          onChangeText={(text) => {
            setSearchTerm(text);
            fetchData(text);
          }}
          placeholder="Select the destination point"
        />
        <Pressable  style={{ top: 7 }}>
          <Ionicons name="search" size={25} color="grey" />
        </Pressable>
      </View>
      <View style={styles.listResults}>
        <FlatList
          data={data}
          keyExtractor={(item,index) => item.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                console.log(item);
                navigation.navigate("Home", {dLocation: item});
              }}>
              <Text style={{ marginBottom: 15, fontSize: 16 }}>{item.display_place}</Text>
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

export default SearchToLocation;

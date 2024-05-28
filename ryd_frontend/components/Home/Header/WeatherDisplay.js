import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";

export default function WeatherDisplay() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      setLoading(false);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    fetchWeather(location.coords.latitude, location.coords.longitude);
  };

  const fetchWeather = async (latitude, longitude) => {
    const apiKey = "361d78ee85750ee52bd5d66951305268"; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={WeatherDisplayStyles.container}>
      {loading ? (
        <ActivityIndicator size="small" color="grey" />
      ) : weather ? (
        <View style={WeatherDisplayStyles.weatherContainer}>
          <Image
            style={WeatherDisplayStyles.icon}
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
            }}
          />
          <Text style={WeatherDisplayStyles.temperature}>
            {Math.round(parseInt(weather.main.temp))}°C
          </Text>
        </View>
      ) : (
        <Text>Fetching weather data...</Text>
      )}
    </View>
  );
}

const WeatherDisplayStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    width: "15%",
    height: "65%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
  },
  weatherContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  temperature: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 8,
  },
  icon: {
    width: 23,
    height: 23,
  },
});

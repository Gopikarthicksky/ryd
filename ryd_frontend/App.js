import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginPage from "./components/Login/LoginPage";
import IntroPage from "./components/Home/IntroPage";
import CreateRides from "./components/Browse/Create/CreateRides";
import Ridecreation from "./components/Browse/Create/Ridecreation";
import HomePage from "./components/Home/HomePage";
import SignUpPage from "./components/SignUp/SignUpPage";
import ProfileInfoPage from "./components/Profile/ProfileInfoPage";
import SearchFromLocation from "./components/Browse/Locations/SearchFromLocation";
import SearchToLocation from "./components/Browse/Locations/SearchToLocation";
import CreateFromLocation from "./components/Browse/CreateLocation/CreateFromLocation";
import CreateToLocation from "./components/Browse/CreateLocation/CreateToLocation";
import SearchResult from "./components/Browse/Search/SearchRides";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Intro"
          component={IntroPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }}
          initialParams={{ sLocation: '',dLocation: ''}}
        />
        {/*         <Stack.Screen
          name="Profile"
          component={ProfileInfoPage}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="FromLocation"
          component={SearchFromLocation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ToLocation"
          component={SearchToLocation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateFromLocation"
          component={CreateFromLocation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateToLocation"
          component={CreateToLocation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateRides"
          component={CreateRides}
          options={{ headerShown: false }}
          initialParams={{ sLocation: ''}}
        />
        <Stack.Screen
          name="Ridecreation"
          component={Ridecreation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchResult"
          component={SearchResult}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import SplashScreen from '../screens/splashscreen';
// import HomeScreen from '../screens/homescreen';
// import SignupScreen from '../screens/signup';
// import LoginScreen from '../screens/login';
// import HomeScreen2 from '../screens/homescreen2';
// import Schemes from '../screens/schemes'

// const Stack = createStackNavigator();

// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Signup" component={SignupScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Home2" component={HomeScreen2} />
//         <Stack.Screen name="Schemes" component={Schemes} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Import Screens
import SplashScreen from "../screens/splashscreen";
import SignupScreen from "../screens/signup";
import LoginScreen from "../screens/login";
import HomeScreen from "../screens/homescreen";
import HomeScreen2 from "../screens/homescreen2";
import Schemes from "../screens/schemes";

// Create Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// ✅ Bottom Tab Navigator
const BottomTabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Hide top header
        tabBarStyle: { backgroundColor: "#fff", height: 60 },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Schemes") {
            iconName = "database";
          }
          return <Icon name={iconName} color={color} size={size} />;
        },
      })}
    >
      {/* ✅ Fix for Home tab not reloading */}
      <Tab.Screen
        name="Home"
        component={HomeScreen2}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault(); // Prevent default navigation
            navigation.reset({
              index: 0,
              routes: [{ name: "Home2" }],
            }); // Force reset to Home screen
          },
        })}
      />
      <Tab.Screen name="Schemes" component={Schemes} />
      <Tab.Screen name="Bank" component={BankScreen} />
    </Tab.Navigator>
  );
};

// ✅ Stack Navigator (Includes Splash, Login, and Bottom Tabs)
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Home2" component={HomeScreen2} />
        <Stack.Screen name="Schemes" component={Schemes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

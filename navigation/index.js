import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import Home from "../screens/Home";
import Dashboard from "../screens/Dashboard";

const MainStack = createStackNavigator();

const MainStackScreens = ({ navigation }) => (
    <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
        />
        <MainStack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{headerShown: false}}
        />
    </MainStack.Navigator>
);

export default () => (
    <NavigationContainer>
        <MainStackScreens />
    </NavigationContainer>
);

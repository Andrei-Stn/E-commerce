import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "./Login";
import SignUpScreen from "./Register";
import SignUpSellerScreen from "./SellerRegisterForm";
import LoginSellerScreen from "./SellerLogin";
import SellerOrderScreen from "./SellerOrderScreen";

const RootStackScreen = ({ navigation }) => {
  const RootStack = createStackNavigator();
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="Login" component={SignInScreen} />
      <RootStack.Screen name="Register" component={SignUpScreen} />
      <RootStack.Screen name="SellerRegisterForm" component={SignUpSellerScreen} />
      <RootStack.Screen name="SellerLogin" component={LoginSellerScreen} />
      <RootStack.Screen name="SellerOrderScreen" component={SellerOrderScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;

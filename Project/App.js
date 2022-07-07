import React, { useEffect, useState } from "react";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import { View } from "react-native";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabScreen from "./Screens/MainTabScreen";

import { useTheme } from "react-native-paper";

import { DrawerContent } from "./Screens/DrawerContent";
import PaymentScreen from "./Screens/PaymentScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ShopScreen from "./Screens/ShopScreen";
import SupportScreen from "./Screens/SupportScreen";
import RootStackScreen from "./Screens/RootStackScreen";

import { createStackNavigator } from "@react-navigation/stack";
import ItemScreen from "./Screens/ItemScreen";
import CartScreen from "./Screens/CartScreen";
import OrderScreen from "./Screens/OrdersScreen";
import InOrderListScreen from "./Screens/InOrderListScreen";
import { ActivityIndicator } from "react-native";

import { AuthContext } from "./components/context";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

const Drawer = createDrawerNavigator();

const App = () => {
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => ({
    signIn: () => {
      setUserToken("123asd");
    },
    signOut: () => {
      setUserToken(null);
    },
    signUp: () => {
      setUserToken("123asd");
    },
  }));

  const { colors } = useTheme();
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken !== null ? (
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <DrawerContent {...props} />}
          >
            <Drawer.Screen
              options={{ headerShown: false }}
              name="HomeDrawer"
              component={MainTabScreen}
            />
            <Drawer.Screen
              options={{ headerShown: false }}
              name="SupportScreen"
              component={SupportScreen}
            />
            <Drawer.Screen
              options={{ headerShown: true }}
              name="CartScreen"
              component={CartScreen}
            />
            <Drawer.Screen
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: colors.background,
                  shadowColor: colors.background, // iOS
                  elevation: 0, // Android
                },
                headerTintColor: colors.text,
              }}
              name="Shop"
              component={ShopScreen}
            />
            <Drawer.Screen
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: colors.background,
                  shadowColor: colors.background, // iOS
                  elevation: 0, // Android
                },
                headerTintColor: colors.text,
              }}
              name="Item"
              component={ItemScreen}
            />
            <Drawer.Screen
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: colors.background,
                  shadowColor: colors.background, // iOS
                  elevation: 0, // Android
                },
                headerTintColor: colors.text,
              }}
              name="Cart"
              component={CartScreen}
            />
            <Drawer.Screen
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: colors.background,
                  shadowColor: colors.background, // iOS
                  elevation: 0, // Android
                },
                headerTintColor: colors.text,
              }}
              name="OrderScreen"
              component={OrderScreen}
            />
            <Drawer.Screen
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: colors.background,
                  shadowColor: colors.background, // iOS
                  elevation: 0, // Android
                },
                headerTintColor: colors.text,
              }}
              name="InOrder"
              component={InOrderListScreen}
            />
            <Drawer.Screen
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: colors.background,
                  shadowColor: colors.background, // iOS
                  elevation: 0, // Android
                },
                headerTintColor: colors.text,
              }}
              name="Payment"
              component={PaymentScreen}
            />
          </Drawer.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
export default App;

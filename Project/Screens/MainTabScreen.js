import React from "react";

import HomeScreen from "./HomeScreen";
import PaymentScreen from "./PaymentScreen";
import ProfileScreen from "./ProfileScreen";

import { View } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import ExploreScreen from "./ExploreScreen";
import { useTheme, Avatar } from "react-native-paper";
import MapScreen from "./MapScreen";
import CartScreen from "./CartScreen";
import ItemScreen from "./ItemScreen";
import ShopScreen from "./ShopScreen";
import InOrderListScreen from "./InOrderListScreen";
import OrderScreen from "./OrdersScreen";

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Home" activeColor="#fff">
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: "Home",
        tabBarColor: "#1f65ff",
        tabBarIcon: ({ color }) => <Icon name="home" color={color} size={22} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: "Profile",
        tabBarColor: "#1f65ff",
        tabBarIcon: ({ color }) => (
          <Icon name="user-tag" color={color} size={22} />
        ),
      }}
    />
    <Tab.Screen
      name="CartScreen"
      component={CartScreen}
      options={{
        tabBarLabel: "Cart",
        tabBarColor: "#1f65ff",
        tabBarIcon: ({ color }) => (
          <Icon name="cart-plus" color={color} size={22} />
        ),
      }}
    />
    <Tab.Screen
      name="Explore"
      component={MapScreen}
      options={{
        tabBarLabel: "Explore",
        tabBarColor: "#1f65ff",
        tabBarIcon: ({ color }) => (
          <Icon name="map-marked" color={color} size={22} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      headerMode="float"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="bars"
                size={20}
                marginLeft={10}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          title: "Shop",
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="bars"
                size={20}
                marginLeft={10}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="Item"
        component={ItemScreen}
        options={{
          title: "Item",
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="bars"
                size={20}
                marginLeft={10}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
    </HomeStack.Navigator>
  );
};
const ProfileStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="bars"
                size={20}
                marginLeft={10}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          title: "Orders",
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="bars"
                size={20}
                marginLeft={10}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="InOrder"
        component={InOrderListScreen}
        options={{
          title: "Order Products",
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="bars"
                size={20}
                marginLeft={10}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
    </ProfileStack.Navigator>
  );
};

import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";

import bgImage from "../images/background.jpg";
import logo from "../images/Logo.png";
import Icon from "react-native-vector-icons/MaterialIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
const { width: WIDTH } = Dimensions.get("window");

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [toggled, setToggled] = useState(false);
  const [error, setError] = useState("");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name, email: email, password: password }),
  };
  function sendCredentials() {
    fetch("http://192.168.0.167:3000/api/user/register", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.inputContainer}>
        <Icon
          name={"person-outline"}
          size={28}
          color={"rgba(255,255,255, 0.7)"}
          style={styles.inputIcon}
        />

        <TextInput
          style={styles.input}
          placeholder={"Name"}
          placeholderTextColor={"rgba(255,255,255,0.7)"}
          underlineColorAndroid="transparent"
          value={name}
          onChangeText={(input) => setName(input)}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon
          name={"person-outline"}
          size={28}
          color={"rgba(255,255,255, 0.7)"}
          style={styles.inputIcon}
        />

        <TextInput
          style={styles.input}
          placeholder={"Email"}
          placeholderTextColor={"rgba(255,255,255,0.7)"}
          underlineColorAndroid="transparent"
          value={email}
          onChangeText={(input) => setEmail(input)}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon
          name={"lock"}
          size={28}
          color={"rgba(255,255,255, 0.7)"}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={"Password"}
          secureTextEntry={!toggled}
          placeholderTextColor={"rgba(255,255,255,0.7)"}
          underlineColorAndroid="transparent"
          value={password}
          onChangeText={(input) => setPassword(input)}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          style={styles.btnEye}
          onPress={() => setToggled((toggled) => !toggled)}
        >
          <Icon
            name={toggled ? "visibility" : "visibility-off"}
            size={26}
            color={"rgba(255,255,255,0.7)"}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btnRegister}>
        <Text style={styles.text} onPress={() => sendCredentials()}>
          Register
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnAlreadyAccount}
        onPress={() => navigation.navigate("SellerRegisterForm")}
      >
        <Text style={styles.text}>Register as seller</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnAlreadyAccount}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.text}>Already have an account?</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 80,
    marginTop: 100,
  },
  logo: {
    width: 180,
    height: 95,
  },
  input: {
    width: WIDTH - 55,
    height: 40,
    borderRadius: 45,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "rgba(0,0,0,0.35)",
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 25,
  },
  inputIcon: {
    position: "absolute",
    top: 7,
    left: 35,
  },
  inputContainer: {
    marginTop: 10,
  },
  btnEye: {
    position: "absolute",
    top: 7,
    right: 46,
  },
  btnRegister: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    backgroundColor: "#432577",
    justifyContent: "center",
    marginTop: 25,
  },
  btnAlreadyAccount: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    backgroundColor: "#432577",
    justifyContent: "center",
    marginTop: 25,
  },
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center",
  },
});

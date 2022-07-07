import React, { useReducer, useState } from "react";
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

import AsyncStorage from "@react-native-community/async-storage";

import bgImage from "../images/background.jpg";
import logo from "../images/Logo.png";
import Icon from "react-native-vector-icons/MaterialIcons";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext } from "../components/context";

const { width: WIDTH } = Dimensions.get("window");

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggled, setToggled] = useState(false);
  const [error, setError] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": "",
    },
    body: JSON.stringify({ email: email, password: password }),
  };

  const sendCredentials = async () => {
    await fetch("http://192.168.0.167:3000/api/user/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data === "Logged") setIsLogged(true);
        else Alert.alert(data);
      });
  };

  const { signIn } = React.useContext(AuthContext);

  function nextScreen() {
    if (isLogged) {
      signIn();
    }
  }

  return (
    <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.inputContainer}>
        <Icon
          name={"email"}
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

        <TouchableOpacity
          style={styles.btnLogin}
          onPress={() => {
            sendCredentials();
            // signIn();
            nextScreen();
          }}
        >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnRegister}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
      </View>
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
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    backgroundColor: "#432577",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 25,
  },
  btnRegister: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    backgroundColor: "#432577",
    justifyContent: "center",
    marginTop: 25,
    marginLeft: 25,
  },
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center",
  },
});

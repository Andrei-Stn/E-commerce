import React, { useState, useEffect } from "react";
//import { useForm } from "react-hook-form";
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
import AwsomeIcon from "react-native-vector-icons/FontAwesome";
// import RNFetchBlob from "rn-fetch-blob";
import * as FileSystem from "expo-file-system";
import { ScrollView } from "react-native-gesture-handler";
// import ImagePicker from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";




const { width: WIDTH } = Dimensions.get("window");
//const path = require("react-native-path");
//const fs = require("react-native-fs");


export default function SellerRegister({ navigation }){

   const [name, setName] = useState("");
   const [companyName, setCompanyName] = useState("");
   const [companyEMail, setCompanyEMail] = useState("");
   const [password, setPassword] = useState("");
   const [motto, setMotto] = useState("");
   const [toggled, setToggled] = useState(false);
   const [sellerImage, setImage] = useState(Image);
   const [sellerImagePath, setSellerImagePath] = useState(null);
   

   useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result);
      setSellerImagePath(result.uri);
      
      
      //setSellerImagePath(result.Path);
    }
  };

   
  // function sendCredentials() {
  //   fetch("http://192.168.1.212:3000/api/sellers/seller", requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }

  let uploadCredentials = async () => {
    const data = new FormData();
    data.append("sellerImage", sellerImage);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Content-Type": "multipart/form-data" },
      body: { name: name, companyName: companyName, companyEMail: companyEMail, password: password, motto: motto, sellerImage: data },
    };

    let res = await fetch("http://192.168.1.212:3000/api/sellers/seller", requestOptions);
    let responseJson = await res.json();
    if(responseJson.status == 1) {
      alert("Upload Succesefull");
    } else {
      alert("Unsucesseful");
    }
  }

  
  
    return(

        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
            </View>
<ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.inputContainer}>
                <Icon
                    name={"person-outline"}
                    size={28}
                    color={"rgba(255,255,255, 0.7)"}
                    style={styles.inputIcon}
                />

                <TextInput
                    style={styles.input}
                    placeholder={"Representant First Name"}
                    placeholderTextColor={"rgba(255,255,255,0.7)"}
                    underlineColorAndroid="transparent"
                    value={name}
                    onChangeText={(input) => setName(input)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>


            <View style={styles.inputContainer}>
                <AwsomeIcon
                    name={"building-o"}
                    size={28}
                    color={"rgba(255,255,255, 0.7)"}
                    style={styles.inputIcon}
                />

                <TextInput
                    style={styles.input}
                    placeholder={"Company Name"}
                    placeholderTextColor={"rgba(255,255,255,0.7)"}
                    underlineColorAndroid="transparent"
                    value={companyName}
                    onChangeText={(input) => setCompanyName(input)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>

            <View style={styles.inputContainer}>
                <AwsomeIcon
                    name={"building-o"}
                    size={28}
                    color={"rgba(255,255,255, 0.7)"}
                    style={styles.inputIcon}
                />

                <TextInput
                    style={styles.input}
                    placeholder={"Company Email"}
                    placeholderTextColor={"rgba(255,255,255,0.7)"}
                    underlineColorAndroid="transparent"
                    value={companyEMail}
                    onChangeText={(input) => setCompanyEMail(input)}
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

      <View style={styles.inputContainer}>
                <AwsomeIcon
                    name={"building-o"}
                    size={28}
                    color={"rgba(255,255,255, 0.7)"}
                    style={styles.inputIcon}
                />

                <TextInput
                    style={styles.input}
                    placeholder={"Motto"}
                    placeholderTextColor={"rgba(255,255,255,0.7)"}
                    underlineColorAndroid="transparent"
                    value={motto}
                    onChangeText={(input) => setMotto(input)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
      </View>

      {/* Image part */}
    
<View>
        <Text>Add an image: </Text>
        <TouchableOpacity
          style={styles.btnAlreadyAccount}
          onPress={pickImage}
        >
          <Text style={styles.text}>Add Image</Text>
        </TouchableOpacity>
        <Image style={styles.img} source={{uri: sellerImagePath}}></Image>

        </View>
            
            <TouchableOpacity style={styles.btnRegister}>
              <Text style={styles.text} onPress={() => uploadCredentials()}>
                Register as seller!
              </Text>
            </TouchableOpacity>

            
            <View>
              <TouchableOpacity
                style={styles.btnAlreadyAccount}
                onPress={() => navigation.navigate("SellerLogin")}
              >
                <Text style={styles.text}>Already have a seller account?</Text>
              </TouchableOpacity>
            </View>
            
            </ScrollView>
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

    img: {
      width: '100%',
      height: 200,
      
    },

    contentContainer: {
      marginBottom: 100,
      
      
    }
    
  });
  
import React, { useState, useEffect } from "react";
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
    FlatList
  } from "react-native";
import bgImage from "../images/background.jpg";
import logo from "../images/Logo.png";
import { List, ListItem } from "react-native-elements";

const { width: WIDTH } = Dimensions.get("window");



export default function SellerOrderScreen({ navigation }) {

  const [data, setData] = useState([]);
  const [itemArray, setItemArr] = useState([]);
  useEffect(() => {
    fetch("http://192.168.1.212:3000/api/stores/order")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);
    
  data.forEach(element => console.log(element._id));
  //setItemArr(data.order);

    return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return(
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert("Pressed");
                  }}
                >
                <View style={styles.cardsWrapper}>
                  {/* <View style={styles.card}> */}
                    {/* <View style={styles.cardImgWrapper}>
                      <Image
                        source={{
                          uri: item.url,
                        }}
                        resizeMode="cover"
                        style={styles.sliderImage}
                      />
                    </View> */}
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardTitle}>{item._id}</Text>
                      {/* <Text style={styles.cardDetails}>{item.description}</Text> */}
                    {/* </View> */}
                  </View>
                </View>
              </TouchableOpacity>
              );
            }}
          />
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
    container: {
      flex: 1,
    },
    sliderContainer: {
      height: 200,
      width: "90%",
      marginTop: 10,
      justifyContent: "center",
      alignSelf: "center",
      borderRadius: 8,
    },
    item: {
      marginTop: 24,
      padding: 30,
      fontSize: 24,
      marginHorizontal: 10,
    },
    wrapper: {},
  
    slide: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "transparent",
      borderRadius: 8,
    },
    sliderImage: {
      height: "100%",
      width: "100%",
      alignSelf: "center",
      borderRadius: 8,
    },
    categoryContainer: {
      flexDirection: "row",
      width: "90%",
      alignSelf: "center",
      marginTop: 25,
      marginBottom: 10,
    },
    categoryBtn: {
      flex: 1,
      width: "30%",
      marginHorizontal: 0,
      alignSelf: "center",
    },
    categoryIcon: {
      borderWidth: 0,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      width: 70,
      height: 70,
      backgroundColor: "#fdeae7" /* '#FF6347' */,
      borderRadius: 50,
    },
    categoryBtnTxt: {
      alignSelf: "center",
      marginTop: 5,
      color: "#de4f35",
    },
    cardsWrapper: {
      // marginTop: 10,
      // width: "90%",
      // alignSelf: "center",
      marginHorizontal: 10,
      marginVertical: 5,
      borderRadius: 10,
      borderColor: '#ddd',
      borderWidth: 1,
      padding:10
    },
    card: {
      height: 100,
      marginVertical: 5,
      flexDirection: "row",
      shadowColor: "#999",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    cardImgWrapper: {
      flex: 1,
    },
    cardImg: {
      height: "100%",
      width: "100%",
      alignSelf: "center",
      borderRadius: 8,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
    },
    cardInfo: {
      flex: 2,
      padding: 10,
      borderColor: "#ccc",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderBottomRightRadius: 8,
      borderTopRightRadius: 8,
      backgroundColor: "#fff",
    },
    cardTitle: {
      fontWeight: "bold",
    },
    cardDetails: {
      fontSize: 12,
      color: "#444",
    },
    text: {
      color: "rgba(255,255,255,0.7)",
      fontSize: 16,
      textAlign: "center",
    },
  });
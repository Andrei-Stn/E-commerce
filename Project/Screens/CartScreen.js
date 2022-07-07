import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

function search(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i]._id === undefined) {
      return "baga item";
    } else {
      return "incrementeaza count";
    }
  }
  return false;
}

function calcultateTotal(myArray) {
  let sum = 0;
  myArray.forEach((element) => {
    sum += parseInt(element.price);
  });
  return sum;
}

const CartScreen = ({ route, navigation }) => {
  if (route.params === undefined)
    return (
      <View>
        <Text>Your cart is empty</Text>
      </View>
    );
  else {
    const [items, setItems] = useState([]);

    const { item } = route.params;
    const { count } = route.params;

    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "auth-token": AsyncStorage.getItem("token"),
    //   },
    //   body: JSON.stringify({ order: items }),
    // };
    // function sendItems() {
    //   fetch("http://192.168.0.167:3000/api/stores/order", requestOptions)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);
    //     });
    // }
    const totalPrice = calcultateTotal(items);
    console.log(count);
    return (
      <View style={styles.container}>
        {useEffect(() => {
          setItems((items) => [...items, item]);
        }, [item])}
        <FlatList
          data={items}
          keyExtractor={(items) => items._id}
          renderItem={({ item }) => {
            return (
              <View style={styles.cardsWrapper}>
                <View style={styles.card}>
                  <View style={styles.cardImgWrapper}>
                    <Image
                      source={{
                        uri: item.url,
                      }}
                      resizeMode="cover"
                      style={styles.sliderImage}
                    />
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardDetails}>{item.description}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignContent: "flex-start",
                      }}
                    ></View>
                  </View>
                </View>
              </View>
            );
          }}
        />
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.totalTitle}>Total: {totalPrice} $</Text>
        </View>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => {
            navigation.navigate("Payment", {
              paramKey: totalPrice,
              itemKey: items,
            });
          }}
          // onPress={() => sendItems()}
        >
          <Text style={styles.appButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default CartScreen;

const styles = StyleSheet.create({
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
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
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
  totalTitle: {
    justifyContent: "space-between",
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    marginBottom: 40,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#e8be00",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#1f65ff",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: -20,
    marginBottom: 20,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});

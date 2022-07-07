import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const screenWidth = Dimensions.get("window").width;

const ItemScreen = ({ route, navigation }) => {
  const [count, setCount] = useState(1);
  const item = route.params;

  return (
    <View style={styles.wrapper}>
      <Image style={styles.image} source={{ uri: item.url }} />
      <View style={styles.smallItemContainer}>
        <Text style={styles.mainText}>{item.name}</Text>
      </View>
      <View style={styles.smallItemContainer}>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.priceText}>${item.price}</Text>
      </View>

      <View style={styles.smallItemContainer}>
        <Text style={styles.labelText}>How many?</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            if (2 <= count) setCount(count - 1);
          }}
        >
          <Icon name="ios-remove-circle" size={35} color={"#33c37d"} />
        </TouchableOpacity>
        <Text
          style={{ paddingHorizontal: 8, fontWeight: "bold", fontSize: 18 }}
        >
          {count}
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (count >= 1) setCount((count) => count + 1);
          }}
        >
          <Icon name="ios-add-circle" size={35} color={"#33c37d"} />
        </TouchableOpacity>
      </View>

      <View style={styles.itemContainer}></View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CartScreen", {
            item,
            count,
          });
        }}
      >
        <View style={styles.itemContainer}>
          <Text style={styles.buttonText}>Add to cart</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: screenWidth - 20,
    height: 300,
    marginBottom: 5,
  },
  stepperContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    borderColor: "#ccc",
  },
  itemContainer: {
    marginBottom: 20,
  },
  smallItemContainer: {
    marginBottom: 15,
  },
  mainText: {
    fontSize: 20,
  },
  subText: {
    fontSize: 14,
    color: "#3a3a3a",
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "#787878",
  },
  priceText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  labelText: {
    fontSize: 18,
    color: "#303540",
  },
  stepperButton: {
    height: 20,
    width: 20,
  },
  stepperText: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },

  buttonText: {
    color: "#c53c3c",
    fontSize: 20,
  },
});

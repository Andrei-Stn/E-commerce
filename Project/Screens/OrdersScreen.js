import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

const search = (nameKey, myArray) => {
  let array = [];
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].id_shop == nameKey) {
      {
        array.push(myArray[i]);
      }
    }
  }
  return array;
};

// const RenderTheItem = (props) => {
//   const products = search(props.id, props.items);

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={products}
//         keyExtractor={(item) => item.name}
//         renderItem={({ item }) => {
//           return (
//             <TouchableOpacity
//               onPress={() => {
//                 props.navigation.navigate("Item", item);
//               }}
//             >
//               <View style={styles.cardsWrapper}>
//                 <View style={styles.card}>
//                   <View style={styles.cardImgWrapper}>
//                     <Image
//                       source={{ uri: item.url }}
//                       resizeMode="cover"
//                       style={styles.sliderImage}
//                     />
//                   </View>
//                   <View style={styles.cardInfo}>
//                     <Text style={styles.cardTitle}>{item.name}</Text>
//                     <Text style={styles.cardPrice}>{item.price} $</Text>
//                     <Text style={styles.cardDetails}>{item.description}</Text>
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           );
//         }}
//       />
//     </View>
//   );
// };

const OrderScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("http://192.168.0.167:3000/api/stores/order")
      .then((response) => response.json())
      .then((json) => setOrders(json))
      .catch((error) => console.error(error));
  }, []);
  return (
    <FlatList
      data={orders}
      keyExtractor={(orders) => orders._id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("InOrder", item);
            }}
          >
            <View style={styles.cardsWrapper}>
              <View style={styles.card}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>Order 1</Text>
                  <Text style={styles.cardDetails}>
                    Order Status: {item.orderStatus}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default OrderScreen;

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
  cardsWrapper: {
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
  },
  card: {
    height: 70,
    marginVertical: 5,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
    fontSize: 16,
    fontWeight: "bold",
  },
  cardPrice: {
    fontWeight: "bold",
    fontSize: 12,
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
});

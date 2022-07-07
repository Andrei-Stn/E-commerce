// import React, { Component } from "react";
// import { Platform, StyleSheet, Text, View, Button } from "react-native";
// import { SQIPCore, SQIPCardEntry } from "react-native-square-in-app-payments";

// export default class PaymentScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.onStartCardEntry = this.onStartCardEntry.bind(this);
//     this.onCardNonceRequestSuccess = this.onCardNonceRequestSuccess.bind(this);
//   }
//   async componentDidMount() {
//     SQIPCore.setSquareApplicationId("sq0idb-TMg5nE-AVJvE_ooWKWWXoA");
//     if (Platform.OS === "ios") {
//       await SQIPCardEntry.setIOSCardEntryTheme({
//         saveButtonFont: {
//           size: 25,
//         },
//         saveButtonTitle: "Pay 💳 ",
//         keyboardAppearance: "Light",
//         saveButtonTextColor: {
//           r: 255,
//           g: 0,
//           b: 125,
//           a: 0.5,
//         },
//       });
//     }
//   }
//   async onCardNonceRequestSuccess(cardDetails) {
//     try {
//       console.log(cardDetails);
//       await SQIPCardEntry.completeCardEntry(this.onCardEntryComplete());
//     } catch (ex) {
//       await SQIPCardEntry.showCardNonceProcessingError(ex.message);
//     }
//   }

//   onCardEntryCancel() {}

//   async onStartCardEntry() {
//     const cardEntryConfig = {
//       collectPostalCode: false,
//     };
//     await SQIPCardEntry.startCardEntryFlow(
//       cardEntryConfig,
//       this.onCardNonceRequestSuccess,
//       this.onCardEntryCancel
//     );
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button onPress={this.onStartCardEntry} title="Start Card Entry" />
//       </View>
//     );
//   }
// }

// import React from "react";
// import PaystackWebView from "react-native-paystack-webview";
// import { View } from "react-native";

// const PaymentScreen = () => {
//   return (
//     <View style={{ flex: 1 }}>
//       <PaystackWebView
//         buttonText="Pay Now"
//         showPayButton={true}
//         paystackSecretKey="sk_test_a84c5fa304231198ace64bf04a0ddc08b1c1f344"
//         paystackKey="pk_test_6d1194998e6b1526e3fe830a7c3b7e7504381585"
//         amount={120}
//         billingEmail="paystackwebview@something.com"
//         billingMobile="09787377462"
//         billingName="Oluwatobi Shokunbi"
//         ActivityIndicatorColor="green"
//         SafeAreaViewContainer={{ marginTop: 5 }}
//         SafeAreaViewContainerModal={{ marginTop: 5 }}
//         onCancel={(e) => {
//           // handle response here
//         }}
//         onSuccess={(res) => {
//           // handle response here
//         }}
//         autoStart={false}
//       />
//     </View>
//   );
// };
// export default PaymentScreen;

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PaymentView from "./component/PaymentView";
import axios from "axios";
import RNRestart from "react-native-restart";

const PaymentScreen = ({ route, navigation }) => {
  const [response, setResponse] = useState();

  const [makePayment, setMakePayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const items = route.params.itemKey;

  const cartInfo = {
    id: "5eruyt35eggr76476236523t3",
    amount: route.params.paramKey,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": "",
    },
    body: JSON.stringify({ order: items }),
  };
  function sendItems() {
    fetch("http://192.168.0.167:3000/api/stores/order", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  function restartScreen() {
    RNRestart.Restart();
  }

  const onCheckStatus = async (paymentResponse) => {
    setPaymentStatus("Please wait while confirming your payment!");
    setResponse(paymentResponse);

    let jsonResponse = JSON.parse(paymentResponse);
    // perform operation to check payment status

    try {
      const stripeResponse = await axios.post("http://localhost:8000/payment", {
        email: "admin@gmail.com",
        product: cartInfo,
        authToken: jsonResponse,
      });

      if (stripeResponse) {
        const { paid } = stripeResponse.data;
        if (paid === true) {
          setPaymentStatus("Payment Success");
        } else {
          setPaymentStatus("Payment failed due to some issue");
        }
      } else {
        setPaymentStatus(" Payment failed due to some issue");
      }
    } catch (error) {
      console.log(error);
      setPaymentStatus(" Payment failed due to some issue");
    }
  };
  const paymentUI = () => {
    if (!makePayment) {
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: 300,
            marginTop: 50,
          }}
        >
          <Text style={{ fontSize: 25, margin: 10 }}> Make Payment </Text>
          <Text style={{ fontSize: 16, margin: 10 }}> </Text>
          <Text style={{ fontSize: 16, margin: 10 }}>
            {" "}
            Payable Amount: {cartInfo.amount}{" "}
          </Text>

          <TouchableOpacity
            style={{
              height: 60,
              width: 300,
              backgroundColor: "#FF5733",
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setMakePayment(true);
              sendItems();
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 20 }}>Proceed To Pay</Text>
          </TouchableOpacity>
        </View>
      );

      // show to make payment
    } else {
      if (response !== undefined) {
        return (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 300,
              marginTop: 50,
            }}
          >
            <Text style={{ fontSize: 20, margin: 10 }}> {paymentStatus} </Text>
            <TouchableOpacity
              style={{
                marginTop: 50,
                height: 60,
                width: 250,
                backgroundColor: "#FF5733",
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Text style={{ color: "#FFF", fontSize: 20 }}>
                Back To Home Page
              </Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <PaymentView
            onCheckStatus={onCheckStatus}
            product={cartInfo.description}
            amount={cartInfo.amount}
          />
        );
      }
    }
  };

  return <View style={styles.container}>{paymentUI()}</View>;
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  navigation: { flex: 2, backgroundColor: "red" },
  body: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  footer: { flex: 1, backgroundColor: "cyan" },
});

export default PaymentScreen;

import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const SupportScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 60 }}>
        <Text style={{ fontSize: 30 }}>Customer Support</Text>
      </View>
      <View>
        <Text style={{ fontSize: 20, marginHorizontal: 20 }}>
          For customers problems or information please contact us at: +40 712
          123 123
        </Text>
      </View>
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

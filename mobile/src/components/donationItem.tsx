import React from "react";
import { View, Text, StyleSheet } from "react-native";

function DonationItem() {
  return (
    <View style={styles.background}>
      <Text style={styles.textItem}>Data: 10/11/2023</Text>
      <Text style={styles.textItem}>Local: Hospital Estadual</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
    backgroundColor: "white",
  },
  textItem: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 4,
    fontFamily: "Roboto_400Regular",
  },
});

export default DonationItem;

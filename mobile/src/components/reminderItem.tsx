import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ReminderItem() {
  return (
    <View style={styles.background}>
      <Text style={styles.textItem}>Data: 10/11/2023</Text>
      <Text style={styles.textItem}>Local de doação: Hospital Estadual</Text>
      <Text style={styles.textItem}>
        Descrição: Doação de sangue para ajudar o Caio
      </Text>
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

export default ReminderItem;

import React, { useState } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import CardItem from "../../components/donationItem";
import ReminderItem from "../../components/reminderItem";
const Reminders = () => {
  const navigation = useNavigation();
  const handleNavigateBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.containerHeader}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={23} color={"#FD4872"} />
        </TouchableOpacity>
        <Text style={styles.title}>Lembretes</Text>
      </View>
      <View style={styles.container}>
        <ReminderItem></ReminderItem>
        <ReminderItem></ReminderItem>
        <ReminderItem></ReminderItem>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },
  title: {
    color: "#322153",
    fontSize: 20,
    fontFamily: "Ubuntu_700Bold",
    marginBottom: 5,
    textAlign: "center",
  },

  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: Platform.OS === "ios" ? 10 : 20 + Constants.statusBarHeight,
  },
});
export default Reminders;

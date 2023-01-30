import React, { useState } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import DonationItem from "../../components/donationItem";
const DonationHistory = () => {
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
        <Text style={styles.title}>Histórico de doações</Text>
      </View>
      <View style={styles.container}>
        <DonationItem></DonationItem>
        <DonationItem></DonationItem>
        <DonationItem></DonationItem>
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
export default DonationHistory;

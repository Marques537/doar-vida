import React, { useState } from "react";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  Platform,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import Constants from "expo-constants";
const RegisterDonation = () => {
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");

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
        <Text style={styles.title}>Registrar doação</Text>
        <Text style={styles.description}>
          Registre as doações que você já fez!
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.description}>Data</Text>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            value={date}
            onChangeText={setDate}
          />

          <Text style={styles.description}>Local</Text>
          <TextInput
            multiline
            style={styles.input}
            autoCorrect={false}
            value={place}
            onChangeText={setPlace}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Registrar</Text>
        </RectButton>
      </View>
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
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  button: {
    width: "100%",
    backgroundColor: "#FD4872",
    borderRadius: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 4,
    fontFamily: "Roboto_400Regular",
  },
  buttonText: {
    marginLeft: 8,
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Roboto_500Medium",
  },

  input: {
    height: 50,
    backgroundColor: "#FFF",
    width: "100%",
    marginBottom: 5,
    color: "#222",
    fontSize: 17,
    borderRadius: 7,
    paddingLeft: 10,
  },
});
export default RegisterDonation;

import React from 'react';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Image, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
const Detail = () => {
  const navigation = useNavigation();
  const handleNavigateBack = () => {
    navigation.goBack();
  }
  return(
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={23} color={"#FD4872"}/>
        </TouchableOpacity>
        
        <Image style={styles.pointImage} source={{uri: 'https://media-exp1.licdn.com/dms/image/C4D1BAQGcPOMzbQnCQw/company-background_10000/0/1577704279768?e=2147483647&v=beta&t=NwQIPKjCQitZ3qUjZmGoXJwLPnKN2hWmocHAbGT2D4s'}}></Image>
        <Text style={styles.pointName}>Hospital Estadual de Sumaré</Text>
        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>Endereço: rua 4 de março, 783</Text>
          <Text style={styles.addressContent}>Cidade: Campinas</Text>
          <Text style={styles.addressContent}>Estado: São Paulo</Text>
        </View>
        <View style={styles.address}>
          <Text style={styles.addressTitle}>Telefone: (12) 3127-8312</Text>
          <Text style={styles.addressContent}>Celular: (19) 99090-9090</Text>
        </View>
      </View>
      <View style={styles.footer}>
          <RectButton style={styles.button} onPress={() =>{}}>
            <FontAwesome name="whatsapp" size={20} color="#FFF"/>
            <Text style={styles.buttonText}>Whatsapp</Text>
          </RectButton>

          <RectButton style={styles.button} onPress={() =>{}}>
            <Icon name="mail" size={20} color="#FFF"/>
            <Text style={styles.buttonText}>E-mail</Text>
          </RectButton>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  address: {
    marginTop: 32,
  },
  
  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EAEAF0'
  },
  
  button: {
    width: '48%',
    backgroundColor: '#FD4872',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});
export default Detail;
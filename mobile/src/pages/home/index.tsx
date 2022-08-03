import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

export default function App(){
  return (
    <View style={styles.container}>
      <Text style={styles.description}>Olá, Matheus</Text>
      <Text style={styles.description}>Faltam 10 dias para você poder doar sangue!</Text>
      
      <View style={styles.address}>
          <Text style={styles.addressTitle}>Doações realizadas</Text>
          <Text style={styles.addressContent}>4</Text>
      </View>
      <View style={styles.address}> 
        <Text style={styles.addressTitle}>Próxima doação</Text>
        <Text style={styles.addressContent}>29/06/2022</Text>
      </View>

      <View style={styles.address}> 
        <Text style={styles.addressTitle}>Você impactou a vida de 30 pessoas!</Text>
        <Text style={styles.addressContent}>Meta de doação dos últimos 12 meses atingida</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },
  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
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
});
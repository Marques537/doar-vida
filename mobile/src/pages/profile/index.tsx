import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App(){
  return (
    <>
    <View style={styles.containerHeader}>
      <Text style={styles.title}>Perfil</Text>
    </View>
    <View style={styles.container}>
      <Text style={styles.informationTitle}>Nome</Text>
      <Text style={styles.description}>Matheus Marques da Costa Silva</Text>

      <Text style={styles.informationTitle}>Celular</Text>
      <Text style={styles.description}>(19) 98326-6439</Text>

      <Text style={styles.informationTitle}>E-mail</Text>
      <Text style={styles.description}>matheusm537@gmail.com</Text>

      <Text style={styles.informationTitle} onPress={()=>{}}>Alterar senha</Text>
      <Text style={styles.informationTitle } onPress={()=>{}}>Atualizar cadastro</Text>
      <Text style={styles.informationTitle}></Text>
      <TouchableOpacity 
          onPress={()=> {}}
          style={styles.btnExit}>
          <Text style={styles.exitText}>Sair</Text>
        </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 32,
  },  
  containerHeader: {
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },  
  title: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 18,
    marginTop: 5
  },
  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginBottom:20,
    fontFamily: 'Roboto_400Regular',
  },
  informationTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
    marginTop: 15
  },

  btnExit: {
    backgroundColor: '#FD4872',
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },

  exitText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Ubuntu_700Bold',
    
  },

});
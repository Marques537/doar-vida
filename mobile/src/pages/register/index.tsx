import React, { useState } from 'react';
import { Alert } from 'react-native';
import { StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Text, ScrollView, View } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation  } from '@react-navigation/native';
import  Api  from '../../services/Api';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigation = useNavigation();
  
  function handleNavigateBack(){
    navigation.goBack();
  }
  const tryRegister = async () => {
    if (password != repeatPassword){
      return Alert.alert('Atenção','As senhas digitas são diferentes', 
      [{ text: "OK"}]);
    }
    if (name != '' && email != '' && password != ''){
      try{
        const response = await Api.signUp(name,email,password);
        if (response.userId < 1 || response.userId === undefined){
          if (response.message != ''){
            return Alert.alert('Erro',response.message, 
          [{ text: "OK"}]);
          }
          return Alert.alert('Erro','Ocorreu um erro na tentativa de cadastro. Tente novamente', 
          [{ text: "OK"}]);
        }
        handleNavigateBack();
      }catch(err){
        Alert.alert('Erro','Ocorreu um erro na tentativa de cadastro. Tente novamente', 
        [{ text: "OK"}]);
      }      
    }else{
      return Alert.alert('Atenção','preencha todos os campos', 
      [{ text: "OK"}]);  
    }
 }

  return (
    <KeyboardAvoidingView style={styles.background}>
      
      <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={23} color="#FD4872" style={styles.arrow} />
      </TouchableOpacity>
      <Text style={styles.title}>Cadastro</Text>
      <ScrollView>
        <View style={styles.container}>    
          <Text style={styles.description}>Nome</Text>
          <TextInput 
          style={styles.input}
          autoCorrect={false}
          value={name}
          onChangeText={setName}
          />
          <Text style={styles.description}>E-mail</Text>
          <TextInput
          style={styles.input} 
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          />
          <Text style={styles.description}>Senha</Text>
          <TextInput
          secureTextEntry={true}
          style={styles.input} 
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
          />   
          <Text style={styles.description}>Confirmar senha</Text>       
          <TextInput
          secureTextEntry={true}
          style={styles.input} 
          autoCorrect={false}
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          />
          <TouchableOpacity
            onPress={tryRegister} 
            style={styles.btnSubmit}>
            <Text style={styles.submitText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleNavigateBack}
            style={styles.btnLogin}>
            <Text style={styles.loginText}>Login</Text> 
          </TouchableOpacity>
        </View>
      </ScrollView>  
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  
  background:{
    flex:1,
    paddingTop: 32,
  },

  container: {
    flex:1,
    padding: 32,
  },
  arrow:{
    paddingLeft: 32,
  },
  
  input:{
    height: 50,
    backgroundColor: '#FFF',
    width: '100%',
    marginBottom: 5,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    paddingLeft: 10
  },

  btnSubmit: {
    backgroundColor: '#FD4872',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: 30,
    
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Ubuntu_700Bold',
    
  },
  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop:20,
    fontFamily: 'Roboto_400Regular',
    marginBottom: 5
  },
  title: {
    color: '#322153',
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  btnLogin:{
    backgroundColor: 'white',
    borderWidth: 1,
    marginTop: 12,
    borderColor: '#FD4872',
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  loginText: {
    color: '#6C6C80',
    fontSize: 16,
    fontFamily: 'Ubuntu_700Bold',
  },
});
export default Register;
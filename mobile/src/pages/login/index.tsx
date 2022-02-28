import React, { useState, useEffect } from 'react';
import { View, Keyboard, Animated, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Login = () => {
  
  const navigation = useNavigation();

  function navigateToHome(){
    //  navigation.navigate('Login');

      navigation.reset({
        routes: [{ name: 'MainTab'}] as any
      })
    }
 
  const [offset] = useState(new Animated.ValueXY({x: 0, y: 90}));
  const [opacity] = useState(new Animated.Value(0)); 
  const [logo] = useState(new Animated.ValueXY({x: 200, y: 200}));
  
  useEffect(() => {
  Keyboard.addListener('keyboardDidShow', keyboardDidShow);
  Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
        useNativeDriver: true
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      })
    ]).start();
    
    function keyboardDidShow(){
      Animated.parallel([
        Animated.timing(logo.x,{
          toValue: 100,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(logo.y,{
          toValue: 100,
          duration: 100,
          useNativeDriver: false,
        }),
      ]).start();
    }
    
    function keyboardDidHide(){
      Animated.parallel([
        Animated.timing(logo.x,{
          toValue: 200,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(logo.y,{
          toValue: 200,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }

  }, []);
  return (
 <KeyboardAvoidingView style={styles.background}>
   <View style={styles.containerLogo}>
    <Animated.Image 
    style={{ width: logo.x, height: logo.y,}}
    source={require('../../assets/logo.png')} />
   </View>

   <Animated.View 
   style={[
     styles.container,
     {
      opacity: opacity, 
      transform: [
         { translateY: offset.y}
       ]
     }
     ]}>
     <TextInput 
     style={styles.input}
     placeholder="Email"
     autoCorrect={false}
     onChangeText={() =>{}}
     />
     <TextInput
     secureTextEntry={true}
     style={styles.input} 
     placeholder="Senha"
     autoCorrect={false}
     onChangeText={() =>{}}
     />
     
     <TouchableOpacity 
     onPress={navigateToHome}
     style={styles.btnSubmit}>
       <Text style={styles.submitText}>Acessar</Text>
     </TouchableOpacity>
     
    <Text style={styles.description}>Não tem cadastro?</Text>
    <TouchableOpacity style={styles.btnNewAccount}>
      <Text style={styles.registerText}>Criar conta</Text>
       
    </TouchableOpacity>

   </Animated.View>
 </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  
  background:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f5'
  },
  
  containerLogo:{
    flex:1,
    justifyContent: 'center',
  },
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50,
  },
  
  input:{
    height: 60,
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    paddingLeft: 10
  },

  btnSubmit: {
    backgroundColor: '#FD4872',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },

  btnNewAccount:{
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#FD4872',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },

  submitText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Ubuntu_700Bold',
    
  },
  
  btnRegister: {
    marginTop: 10,
  },
  
  registerText: {
    color: '#6C6C80',
    fontSize: 16,
    fontFamily: 'Ubuntu_700Bold',
  },

  
  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Roboto_400Regular',
    marginBottom: 5
  },
});
export default Login;
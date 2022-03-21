import React from 'react';
import { Image, View, StyleSheet} from 'react-native'
import { LoadingIcon } from './styles';

const Preload = () =>{
  return(
  <View style={styles.container}>
    <Image 
      style={styles.logo} 
      source={require('../../assets/logo-1.png')}/>
    <LoadingIcon size="large" color="black"/>
  </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {


  }
}); 

export default Preload;
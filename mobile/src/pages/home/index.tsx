import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import StepIndicator from 'react-native-step-indicator';
import { ScrollView } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';



export default function App(){
  return (
    <>
      <View style={styles.containerHeader}>
        <Text style={styles.title}>Olá, Matheus</Text>
        <Text style={styles.description}>Faltam 10 dias para você poder doar sangue!</Text>
      </View> 
      
      <View style={styles.itemsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20}}>
          <TouchableOpacity style={styles.item} onPress={()=>{}}>
            <Text style={styles.textItem}>Registrar lembrete</Text>
            <Icon name='bell' color='#FD4872'size={24}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={()=>{}}>
            <Text style={styles.textItem}>Registrar doação</Text>
            <Icon name='droplet' color='#FD4872' size={24} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={()=>{}}>
            <Text style={styles.textItem}>Histórico de doações</Text>
            <Icon name='archive' color='#FD4872' size={24} />
          </TouchableOpacity>
        </ScrollView>

      </View>
      <View style={styles.container}>
      <View style={styles.view}>
            <Text style={styles.title}>Doações realizadas</Text>
            <Text style={styles.description}>4</Text>
            <Text style={styles.description}>Você já impactou a vida de 30 pessoas!</Text>
        </View>
        <View style={styles.view}> 
          <Text style={styles.title}>Próxima doação</Text>
          <Text style={styles.description}>29/06/2022</Text>
        </View>
      
        <View style={styles.view}> 
          <Text style={styles.stepIndicator}>Doações dos últimos 12 meses</Text>
          <StepIndicator
          customStyles={stepIndicatorCustomStyles}
          currentPosition={4}
          stepCount = {5}
          />
          <Text style={styles.description}>Meta de doação dos últimos 12 meses atingida!</Text>
        </View>
      </View>
    </>
  );
}

const stepIndicatorCustomStyles = {
  stepIndicatorSize: 35,
  currentStepIndicatorSize:50,
  separatorStrokeWidth: 5,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#FD4872',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#FD4872',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#FD4872',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#FD4872',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelCurrentColor: 'black',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
}
const styles = StyleSheet.create({
  containerHeader: {
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },
  container: {
    paddingHorizontal: 32,
  },
  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },
  view: {
    marginTop: 22,
  },
  title: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
  stepIndicator: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
    marginBottom: 32,
  },
  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 110,
    width: 110,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 1.5,
    
  },
  textItem: {
    color: '#322153',
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
  }

});
import React, { useState } from 'react';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import Api from '../../services/backend-api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const UpdateProfile = () => {
  const { token, userId } = useSelector((state: RootState) => state.auth);
  const [name, setName] = useState('');

  const navigation = useNavigation();
  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const updateProfile = async () => {
    if (name != '') {
      const response = await Api.updateUserProfile(token, userId, name);
      if (response.name) {
        Alert.alert('Sucesso', 'Perfil atualizado', [{ text: 'OK' }]);
        handleNavigateBack();
      } else {
        Alert.alert(
          'Erro',
          'Ocorreu um erro na tentativa de atualizar o perfil. Tente novamente',
          [{ text: 'OK' }]
        );
      }
    } else {
      return Alert.alert('Atenção', 'preencha todos os campos', [
        { text: 'OK' },
      ]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.containerHeader}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={23} color={'#FD4872'} />
        </TouchableOpacity>
        <Text style={styles.title}>Atualização de cadastro</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.description}>Nome</Text>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            value={name}
            onChangeText={setName}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={updateProfile}>
          <Text style={styles.buttonText}>Alterar</Text>
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
    color: '#322153',
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginBottom: 5,
    textAlign: 'center',
  },

  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: Platform.OS === 'ios' ? 10 : 20 + Constants.statusBarHeight,
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  button: {
    width: '100%',
    backgroundColor: '#FD4872',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },
  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },

  input: {
    height: 50,
    backgroundColor: '#FFF',
    width: '100%',
    marginBottom: 5,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    paddingLeft: 10,
  },
});
export default UpdateProfile;

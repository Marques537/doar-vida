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

const ChangePassword = () => {
  const { token, userId } = useSelector((state: RootState) => state.auth);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();
  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const updatePassword = async () => {
    if (oldPassword != '' && password != '' && confirmPassword != '') {
      if (password != confirmPassword) {
        return Alert.alert('Erro', 'As senhas não coincidem. Tente novamente.');
      }
      console.log('aqui');
      const response = await Api.updateUserPassword(
        token,
        userId,
        oldPassword,
        password
      );
      console.log(response);

      if (response.message === 'success') {
        Alert.alert('Sucesso', 'Senha atualizada', [{ text: 'OK' }]);
        handleNavigateBack();
      } else {
        if (response.message === 'invalid password') {
          return Alert.alert(
            'Erro',
            'Senha atual incorreta. Tente novamente.',
            [{ text: 'OK' }]
          );
        }
        return Alert.alert(
          'Erro',
          'Ocorreu um erro na tentativa de atualizar a senha. Tente novamente.',
          [{ text: 'OK' }]
        );
      }
    } else {
      return Alert.alert('Atenção', 'Preencha todos os campos.', [
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
        <Text style={styles.title}>Alteração de senha</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.description}>Senha antiga</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            autoCorrect={false}
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <Text style={styles.description}>Nova senha</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            autoCorrect={false}
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.description}>Confirmação da nova senha</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            autoCorrect={false}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={updatePassword}>
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
export default ChangePassword;

import React, { useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
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
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Api from '../../services/backend-api';
import moment from 'moment';
import { DateTimeFormat } from '../../enums/dates.enum';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const RegisterReminder = () => {
  const { token, userId } = useSelector((state: RootState) => state.auth);
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const navigation = useNavigation();
  const handleNavigateBack = () => {
    navigation.goBack();
  };
  const handleConfirm = (date: any) => {
    setDate(moment(date).format(DateTimeFormat.BR));
    setDatePickerVisibility(false);
  };

  const registerReminder = async () => {
    if (date != '' && place != '') {
      const response = await Api.createReminder(
        token,
        userId,
        moment(date).format('yyyy/MM/DD HH:mm'),
        place,
        description
      );
      if (response.id) {
        setDate('');
        setPlace('');
        setDescription(undefined);
        Alert.alert('Sucesso', 'Lembrete registrado', [{ text: 'OK' }]);
      } else {
        Alert.alert(
          'Erro',
          'Ocorreu um erro na tentativa de registro. Tente novamente',
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
        <Text style={styles.title}>Criar lembrete</Text>
        <Text style={styles.description}>
          Faça o agendamento no posto de coleta e adicione aqui um lembrete para
          não esquecer a data
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.description}>Data</Text>
          <Text
            style={styles.input}
            onPress={() => setDatePickerVisibility(true)}
          >
            {date
              ? moment(date, DateTimeFormat.BR).format('DD/MM/yyyy HH:mm')
              : null}
          </Text>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          />

          <Text style={styles.description}>Local</Text>
          <TextInput
            multiline
            style={styles.input}
            autoCorrect={false}
            value={place}
            onChangeText={setPlace}
          />

          <Text style={styles.description}>Descrição</Text>
          <TextInput
            multiline
            style={styles.input}
            autoCorrect={false}
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.description}>
          Fique tranquilo vamos te lembrar quando a data estiver próxima!
        </Text>
        <RectButton style={styles.button} onPress={registerReminder}>
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
    paddingTop: 10,
    paddingLeft: 10,
  },
});
export default RegisterReminder;

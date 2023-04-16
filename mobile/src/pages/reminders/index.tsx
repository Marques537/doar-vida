import React, { useEffect, useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import ReminderItem from '../../components/reminderItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Api from '../../services/backend-api';
import moment from 'moment';
import { DateTimeFormat } from '../../enums/dates.enum';

interface Reminder {
  id: number;
  user_id: number;
  date: string;
  description: string;
  local: string;
}

const Reminders = () => {
  const { token, userId } = useSelector((state: RootState) => state.auth);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const navigation = useNavigation();
  const handleNavigateBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    Api.getSchedules(token, userId).then((response) => {
      response.schedules?.sort((a: any, b: any) => {
        return moment(b.date, DateTimeFormat.BR).diff(
          moment(a.date, DateTimeFormat.BR)
        );
      });
      setReminders(response.schedules);
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.containerHeader}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={23} color={'#FD4872'} />
        </TouchableOpacity>
        <Text style={styles.title}>Lembretes</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {reminders?.map((reminder) => (
            <ReminderItem
              key={reminder.id}
              date={moment(reminder.date, DateTimeFormat.BR).format(
                'DD/MM/YYYY HH:mm'
              )}
              description={reminder.description}
              local={reminder.local}
            />
          ))}
        </View>
      </ScrollView>
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
});
export default Reminders;

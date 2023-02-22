import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import StepIndicator from 'react-native-step-indicator';
import { ScrollView } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Api from '../../services/backend-api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import moment from 'moment';

interface User {
  name: string;
  email: string;
  gender: string;
}
interface Donation {
  donation_id: number;
  user_id: number;
  date: string;
  local: string;
}
interface Schedule {
  id: number;
  user_id: number;
  point_id: string;
  date: string;
  description: string;
}

enum Genders {
  MALE = 'male',
  FEMALE = 'female',
}

export default function Home() {
  const { token, userId } = useSelector((state: RootState) => state.auth);
  const [user, setUser] = useState<User>();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const navigation = useNavigation();
  function handleNavigateToRegisterReminder() {
    navigation.navigate('RegisterReminder' as never);
  }
  function handleNavigateToRegisterDonation() {
    navigation.navigate('RegisterDonation' as never);
  }
  function handleNavigateToDonationHistory() {
    navigation.navigate('DonationHistory' as never);
  }
  function handleNavigateToReminders() {
    navigation.navigate('Reminders' as never);
  }

  useEffect(() => {
    Api.getUser(token, userId).then((response) => {
      setUser(response);
    });
    Api.getDonations(token, userId).then((response) => {
      setDonations(response.donations);
    });
    Api.getScheduleByDate(token, userId, moment().format('YYYY-MM-DD')).then(
      (response) => {
        setSchedules(response.schedules);
      }
    );
  }, []);

  function donationStatus() {
    const maxDonationCount = user?.gender == Genders.MALE ? 4 : 3;
    return donations.filter(
      (donation) => moment(donation.date) >= moment().add(-1, 'year')
    ).length >= maxDonationCount ? (
      <Text style={styles.description}>
        Meta de doação dos últimos 12 meses atingida!
      </Text>
    ) : null;
  }

  function calculateTimeToDonate() {
    //60 days for man and 90 for woman
    const maxDonationCount = user?.gender == Genders.MALE ? 4 : 3;
    const donationInterval = user?.gender == Genders.MALE ? 60 : 90;

    if (
      donations.filter(
        (donation) => moment(donation?.date) >= moment().add(-1, 'year')
      ).length >= maxDonationCount
    ) {
      return null;
    }

    donations?.sort((a, b) => {
      return moment(a.date).diff(moment(b.date));
    });
    const lastDonation = donations?.slice(-1);

    if (lastDonation.length) {
      const days = moment().diff(moment(lastDonation[0]?.date), 'days');
      return days > donationInterval ? (
        <Text style={styles.description}>Você poder doar sangue!</Text>
      ) : (
        <Text style={styles.description}>
          Faltam {donationInterval - days}
          {donationInterval - days > 1 ? ' dias' : ' dia'} para você poder doar
          sangue!
        </Text>
      );
    }
    return <Text style={styles.description}>Você poder doar sangue!</Text>;
  }

  return (
    <>
      <View style={styles.containerHeader}>
        <Text style={styles.title}>Olá, {user?.name}</Text>
        {calculateTimeToDonate()}
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          <TouchableOpacity
            style={styles.item}
            onPress={handleNavigateToRegisterReminder}
          >
            <Text style={styles.textItem}>Criar lembrete</Text>
            <View style={styles.icons}>
              <Icon name="plus" color="#FD4872" size={23} />
              <Icon name="bell" color="#FD4872" size={24} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={handleNavigateToRegisterDonation}
          >
            <Text style={styles.textItem}>Registrar doação</Text>
            <View style={styles.icons}>
              <Icon name="plus" color="#FD4872" size={23} />
              <Icon name="droplet" color="#FD4872" size={24} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={handleNavigateToDonationHistory}
          >
            <Text style={styles.textItem}>Histórico de doações</Text>
            <Icon name="archive" color="#FD4872" size={24} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={handleNavigateToReminders}
          >
            <Text style={styles.textItem}>Lembretes</Text>
            <View style={styles.icons}>
              <Icon
                style={{ transform: [{ rotateZ: '15deg' }] }}
                name="bell"
                color="#FD4872"
                size={22}
              />
              <Icon name="bell" color="#FD4872" size={24} />
              <Icon
                style={{ transform: [{ rotateZ: '-15deg' }] }}
                name="bell"
                color="#FD4872"
                size={22}
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.container}>
        <View style={styles.view}>
          <Text style={styles.title}>Doações realizadas</Text>
          <Text style={styles.description}>{donations.length || 0}</Text>
          <Text style={styles.description}>
            Você já pode ter impactado na vida de {donations.length * 4 || 0}{' '}
            pessoas!
          </Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.title}>Próxima doação</Text>
          <Text style={styles.description}>
            {schedules[0]?.date
              ? moment(schedules[0].date).format('DD/MM/YYYY')
              : 'Agendamento não registrado'}
          </Text>
        </View>

        <View style={styles.view}>
          <Text style={styles.stepIndicator}>Doações dos últimos 12 meses</Text>
          <StepIndicator
            customStyles={stepIndicatorCustomStyles}
            currentPosition={
              donations?.filter(
                (donation) => moment(donation?.date) >= moment().add(-1, 'year')
              ).length - 1
            }
            stepCount={user?.gender == Genders.MALE ? 4 : 3}
          />
          {donationStatus()}
        </View>
      </View>
    </>
  );
}

const stepIndicatorCustomStyles = {
  stepIndicatorSize: 35,
  currentStepIndicatorSize: 50,
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
};
const styles = StyleSheet.create({
  containerHeader: {
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },
  container: {
    paddingHorizontal: 32,
  },
  icons: {
    flexDirection: 'row',
    rotate: '30deg',
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
  },
});

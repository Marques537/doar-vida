import React, { useEffect, useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import DonationItem from '../../components/donationItem';
import Api from '../../services/backend-api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Donation } from '../home';
import moment from 'moment';
import { DateFormat } from '../../enums/dates.enum';

const DonationHistory = () => {
  const navigation = useNavigation();
  const handleNavigateBack = () => {
    navigation.goBack();
  };
  const { token, userId } = useSelector((state: RootState) => state.auth);
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    Api.getDonations(token, userId).then((response) => {
      response.donations?.sort((a: any, b: any) => {
        return moment(b.date, DateFormat.BR).diff(
          moment(a.date, DateFormat.BR)
        );
      });
      setDonations(response.donations);
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.containerHeader}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={23} color={'#FD4872'} />
        </TouchableOpacity>
        <Text style={styles.title}>Histórico de doações</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {donations?.map((donation) => (
            <DonationItem
              key={donation.id}
              date={moment(donation.date, DateFormat.BR).format('DD/MM/YYYY')}
              local={donation.local}
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
export default DonationHistory;

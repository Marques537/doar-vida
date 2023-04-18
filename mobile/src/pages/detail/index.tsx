import React, { useEffect, useState } from 'react';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { Point } from '../map';

const Detail = () => {
  const [point, setPoint] = useState<Point>({} as Point);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const pointInfo = route.params as Point;

    setPoint(pointInfo);
  });

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  if (!point) {
    return null;
    //TODO: (marques537: isolate get point info and render loading screen)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={23} color={'#FD4872'} />
        </TouchableOpacity>

        {point.image && (
          <Image
            style={styles.pointImage}
            source={{
              uri: point.image,
            }}
          />
        )}

        <Text style={styles.pointName}>{point.name}</Text>
        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>Endereço: {point.address}</Text>
          <Text style={styles.addressContent}>Cidade: {point.city}</Text>
          <Text style={styles.addressContent}>Estado: {point.uf}</Text>
        </View>
        <View style={styles.address}>
          <Text style={styles.addressTitle}>Contato</Text>
          {point.phone_number && (
            <Text style={styles.addressContent}>
              Telefone: {point.phone_number}
            </Text>
          )}
          {point.whatsapp && (
            <Text style={styles.addressContent}>Celular: {point.whatsapp}</Text>
          )}
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => {}}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={() => {}}>
          <Icon name="mail" size={20} color="#FFF" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: Platform.OS === 'ios' ? 10 : 20 + Constants.statusBarHeight,
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80',
  },

  address: {
    marginTop: 32,
  },

  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80',
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EAEAF0',
  },

  button: {
    width: '48%',
    backgroundColor: '#FD4872',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});
export default Detail;

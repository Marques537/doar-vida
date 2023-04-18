import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import Api from '../../services/backend-api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export interface Point {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  address: string;
  phone_number: string;
  image?: string;
}

const Points = () => {
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0, 0,
  ]);
  const { token } = useSelector((state: RootState) => state.auth);
  const [points, setPoints] = useState<Point[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Oooops...',
          'Precisamos de sua permissão para obter a localização'
        );
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;
      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  useEffect(() => {
    //TODO: (marques537) get user city and uf and send to backend
    Api.getPoints(token, 'SP', 'São Paulo').then((response) => {
      setPoints(response.points);
    });
  }, []);

  const initialRegion = {
    latitude: initialPosition[0],
    longitude: initialPosition[1],
    latitudeDelta: 0.014,
    longitudeDelta: 0.014,
  };

  function handleNavigateToDetail(point: Point) {
    navigation.navigate('Detail' as never, point as never);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Olá, encontre no mapa postos de coleta de sangue!
      </Text>
      <View style={styles.mapContainer}>
        {initialPosition[0] !== 0 ? (
          <MapView
            style={styles.map}
            loadingEnabled={initialPosition[0] == 0}
            initialRegion={initialRegion}
          >
            {points.map((point) => (
              <Marker
                key={String(point.id)}
                style={styles.mapMarker}
                onPress={() => handleNavigateToDetail(point)}
                coordinate={{
                  latitude: point.latitude,
                  longitude: point.longitude,
                }}
              >
                <View style={styles.mapMarkerContainer}>
                  <Image
                    style={styles.mapMarkerImage}
                    source={
                      point.image
                        ? {
                            uri: point.image,
                          }
                        : require('../../assets/gota-de-sangue.png')
                    }
                  />
                  <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                </View>
              </Marker>
            ))}
          </MapView>
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator color="#FD4872" size="large" animating={true} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },
  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapMarker: {
    width: 70,
    height: 60,
  },
  mapMarkerImage: {
    width: 70,
    height: 30,
    resizeMode: 'contain',
    backgroundColor: '#FFF',
  },
  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 10,
    paddingTop: 5,
  },
  mapMarkerContainer: {
    width: 70,
    height: 60,
    backgroundColor: '#FD4872',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default Points;

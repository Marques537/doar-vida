import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const Points = () => {
  const initialRegion = {
    latitude:-22.8424632,
    longitude: -47.2963221,
    latitudeDelta: 0.014, 
    longitudeDelta: 0.014
  }
  const navigation = useNavigation();

    function handleNavigateToDetail(){
      navigation.navigate('Detail' as never);
    }

  return (
    <View style={styles.container}>

      <Text style={styles.description}>Olá, encontre no mapa pontos de coleta!</Text>
      <View style={styles.mapContainer}>
        <MapView 
          style={styles.map}
          initialRegion={initialRegion}
        >
          <Marker 
            style={styles.mapMarker}
            onPress={handleNavigateToDetail}
            coordinate={initialRegion}>
              <View style={styles.mapMarkerContainer}>
                <Image 
                  style={styles.mapMarkerImage}
                  source={{uri:'https://media-exp1.licdn.com/dms/image/C4D1BAQGcPOMzbQnCQw/company-background_10000/0/1577704279768?e=2147483647&v=beta&t=NwQIPKjCQitZ3qUjZmGoXJwLPnKN2hWmocHAbGT2D4s'}}></Image>
                <Text style={styles.mapMarkerTitle}>Hospital Estadual de Sumaré</Text>
              </View>
          </Marker>
        </MapView>
      </View>
    </View>
  );
}

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
    width: 90,
    height: 80, 
  },
  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },
  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },  
  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#FD4872',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },


}); 
export default Points;
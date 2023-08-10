import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker'; 
import { useAnimation } from 'react-native-reanimated';

const locations = {
  TPR: {
    latitude: 10.7905,
    longitude: 78.7047,
  },
  CBE: {
    latitude: 11.2588, 
    longitude: 78.6569,
  },
  ERD: {
    latitude: 11.1271,
    longitude: 78.0361,
  },
  CHE: {
    latitude: 10.7903,
    longitude: 78.1392,
  }
};

export default function App() {

  const [selectedLocation, setSelectedLocation] = useState('CBE');
  
  const carAnimation = useAnimation();

  const animateCar = async (from, to) => {
    await carAnimation.timing({
      from: {
        latitude: from.latitude,
        longitude: from.longitude,   
      },
      to: {
        latitude: to.latitude,
        longitude: to.longitude,
      } 
    }).start();
  }

  return (
    <View style={styles.container}>

      <MapView
        style={styles.map} 
        initialRegion={{
          latitude: 11.1271,
          longitude: 78.0361,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >

        <Marker coordinate={locations.TPR} title="TPR" />
        <Marker coordinate={locations.CBE} title="CBE" />
        <Marker coordinate={locations.ERD} title="ERD" />
        <Marker coordinate={locations.CHE} title="CHE" />

        <Marker  
          coordinate={carAnimation}
          anchor={{x: 0.5, y: 0.5}}
        >
          <Text style={{fontSize: 25}}>🚗</Text>
        </Marker>

      </MapView>

      <Picker
        selectedValue={selectedLocation}
        onValueChange={(itemValue) => {
          setSelectedLocation(itemValue);
          const from = locations[selectedLocation]; 
          const to = locations[itemValue];
          animateCar(from, to); 
        }}
      >
        <Picker.Item label="TPR" value="TPR" />
        <Picker.Item label="CBE" value="CBE" />
        <Picker.Item label="ERD" value="ERD" />  
        <Picker.Item label="CHE" value="CHE" />
      </Picker>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
// import { GOOGLE_MAPS_API_KEY } from "@/env";
import MapLibreGL from '@maplibre/maplibre-react-native';
import 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

MapLibreGL.setAccessToken(null);


const routing = () => {

    const [source, setSource] = useState(null);
    const [destination, setDestination] = useState(null);
    const [selectingSource, setSelectingSource] = useState(true);
    const [region, setRegion] = useState({
        latitude: 50.8513,  // Maastricht latitude
        longitude: 5.6909,  // Maastricht longitude
        latitudeDelta: 0.0922,  // Zoom level (vertical)
        longitudeDelta: 0.0421,  // Zoom level (horizontal)
    });



    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <MapLibreGL.MapView
              style={styles.map}
              styleURL="https://demotiles.maplibre.org/style.json"
            >
              <MapLibreGL.Camera
                defaultSettings={{
                  centerCoordinate: [4.895168, 52.370216],
                  zoomLevel: 10,
                }}
              />
            </MapLibreGL.MapView>
          </View>
  
                {/* <TouchableOpacity  onPress={handleSelectLocation}>
                    <Text >
                      {selectingSource ? 'Select Source' : 'Select Destination'}
                    </Text>
                </TouchableOpacity> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});


export default routing;
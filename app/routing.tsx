// import { GOOGLE_MAPS_API_KEY } from "@/env";
import 'react';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';


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

    const handleSelectLocation = () => {
      if (selectingSource) {
        setSource(region);
        setSelectingSource(false);
      } else {
        setDestination(region);
      }
    };

    const handleMapPress = (e: any) => {
        const { coordinate, position } = e.nativeEvent;
        console.log('\n=== Map Touch Event ===');
        console.log('Latitude:', coordinate.latitude);
        console.log('Longitude:', coordinate.longitude);
        console.log('Screen Position X:', position.x);
        console.log('Screen Position Y:', position.y);
      };
    
      // Handle long press events
      const handleLongPress = (e) => {
        const { coordinate, position } = e.nativeEvent;
        console.log('\n=== Map Long Press Event ===');
        console.log('Latitude:', coordinate.latitude);
        console.log('Longitude:', coordinate.longitude);
        console.log('Screen Position X:', position.x);
        console.log('Screen Position Y:', position.y);
      };
    
      // Handle drag events
      const handleMapDrag = (e) => {
        const { coordinate, position } = e.nativeEvent;
        console.log('\n=== Map Drag Event ===');
        console.log("API Key is:: ", process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY);

        console.log('Latitude:', coordinate.latitude);
        console.log('Longitude:', coordinate.longitude);
        console.log('Screen Position X:', position.x);
        console.log('Screen Position Y:', position.y);
      };
    

    return (
        <SafeAreaView style={styles.container}>
           <View style={styles.searchContainer}>
              
                </View>

            <MapView style={{width:'100%', height:'100%', flexDirection:'column'}} 
            // initialRegion={{
            //     latitude: 50.8513,  // Maastricht latitude
            //     longitude: 5.6909,  // Maastricht longitude
            //     latitudeDelta: 0.0922,  // Zoom level (vertical)
            //     longitudeDelta: 0.0421,  // Zoom level (horizontal)
            //    }}
              onRegionChangeComplete={setRegion}
              region={region}
              onPress={handleMapPress}
              onLongPress={handleLongPress}
              onPanDrag={handleMapDrag}>
             {source && <Marker coordinate={source} pinColor="green" />}
             {destination && <Marker coordinate={destination} pinColor="red" />}

            </MapView>
                <TouchableOpacity  onPress={handleSelectLocation}>
                    <Text >
                      {selectingSource ? 'Select Source' : 'Select Destination'}
                    </Text>
                </TouchableOpacity>
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
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  autocompleteContainer: {
    flex: 0,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    fontSize: 16,
  },
  listView: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopWidth: 0,
    marginTop: -1,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default routing;
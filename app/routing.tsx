// import { GOOGLE_MAPS_API_KEY } from "@/env";
import RoundedButton from '@/components/RoundedButton';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import 'react';
import { useEffect, useRef, useState } from 'react';
import { BackHandler, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';




const routing = () => {

    const [source, setSource] = useState(null);
    const [destination, setDestination] = useState(null);
    const [selectingSource, setSelectingSource] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState<Date>(new Date());

    const mapRef = useRef<MapView | null>(null);

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
    
    const handleBackButton = () => {
      console.log("In here ", selectingSource)
      if(!selectingSource && source){
        setSource(null);
        setSelectingSource(true);
        console.log("source is: ", source)
        return true;
      }
      return false;
    }
    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
    
    useEffect(() => {
        // Update the marker position when the region changes
        if (mapRef.current) {
          mapRef.current.animateToRegion(region, 100);
        }
    }, [region]);

    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);

      return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      };
  }, [selectingSource]);


    return (
        <SafeAreaView style={styles.container}>
           {/* <View style={styles.searchContainer}>
              
                </View> */}

            <MapView style={styles.map}
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
             {destination && <Marker coordinate={destination} pinColor="orange" />}
             <Marker
                coordinate={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
              />
            </MapView>
            <View style={styles.buttons}>
                {/* <View  className='flex-1'> */}
                <RoundedButton
                  onPress={() => setShow(true)}
                  className='w-16 h-16 bottom-16 rounded-full bg-green-500 shadow-md absolute flex-end p-10 '
                  iconName='rocket'
                /> 
              {/* </View> */}
              {show && <RNDateTimePicker value={new Date()} minimumDate={new Date()} onChange={onDateChange} />
              }
                <TouchableOpacity style={styles.button} onPress={handleSelectLocation}>
                    <Text >
                      {selectingSource ? 'Select Source' : 'Select Destination'}
                    </Text>
                </TouchableOpacity>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject ,
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
  buttons: {
    position: 'absolute',
    // flexDirection: 'column',
    bottom: 20,
    left: 20,
    right: 20,
  },
  button: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default routing;
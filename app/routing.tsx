// import { GOOGLE_MAPS_API_KEY } from "@/env";
import RoundedButton from '@/components/RoundedButton';
import { useTripsStore } from '@/store/trips';
import { region } from '@/types/routing';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import 'react';
import { useEffect, useRef, useState } from 'react';
import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';



const routing = () => {

    const [source, setSource] = useState<region| null>(null);
    const [destination, setDestination] = useState<region| null>(null);
    const [selectingSource, setSelectingSource] = useState(true);
    const [show, setShow] = useState(false);
    const [selectedDate, setDate] = useState<Date>(new Date());

    const mapRef = useRef<MapView | null>(null);

    const [region, setRegion] = useState<region>({
        latitude: 50.8513,  // Maastricht latitude
        longitude: 5.6909,  // Maastricht longitude
        latitudeDelta: 0.0922,  // Zoom level (vertical)
        longitudeDelta: 0.0421,  // Zoom level (horizontal)
    });

    const router = useRouter();

    const addTrip = useTripsStore((state) => state.addTrip)
    const handleSelectLocation = () => {
      if (selectingSource) {
        setSource(region);
        setSelectingSource(false);
      } else {
        setDestination(region);
        if(source && destination){
          addTrip({
            source: source,
            destination: destination,
            date: selectedDate,
            state: 'planned'
            
          })
        }
        
        router.push('/(tabs)/trips');
        router.navigate('/(tabs)/trips');

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
    
      // Handle drag eventsadb logcat '*:E'
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
      if(!selectingSource && source){
        setSource(null);
        setSelectingSource(true);
        return true;
      }
      return false;
    }
    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
      console.log("eventType, ", event.type)
      console.log("IN calendar");
      if (selectedDate && event.type === 'set') {
        setDate(selectedDate);
        console.log("Date is set: ", selectedDate)
      } else {
        setShow(false);  // This will hide the picker if "Cancel" is pressed
      }
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
            provider={PROVIDER_GOOGLE}
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
                  className='w-16 h-16 bottom-16 rounded-full text-black bg-sky-500 shadow-md absolute flex-end  '
                  iconName='calendar'
                /> 
              {/* </View> */}
              {show && <RNDateTimePicker value={selectedDate} mode="date"  onChange={onDateChange} />
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
// import { GOOGLE_MAPS_API_KEY } from "@/env";
import RoundedButton from '@/components/RoundedButton';
import { useTripsStore } from '@/store/trips';
import { region } from '@/types/routing';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { useRouter } from 'expo-router';
import 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { WebViewMessageEvent, WebViewNavigation } from 'react-native-webview/lib/WebViewTypes';
import { useMapInteractions } from '../hooks/useMapInteraction';
import { Coordinates } from '../types/map';

// interface Coordinates {
//   source: [number, number] | null;
//   destination: [number, number] | null;
// }
// const injectedJavaScript = `(function(data) {
//   window.ReactNativeWebView.postMessage(JSON.stringify({key : "value"}));
//     window.ReactNativeWebView.postMessage());
// })();`;

// const injectedJavaScript = `
// (function() {
//   window.postMessage = function(data) {
//     window.ReactNativeWebView.postMessage(data);
//   };
// })();
// `;

interface MarkerMessage {
  action: 'enableMarking' | 'disableMarking' | 'removeLastMarker';
  mode?: 'source' | 'destination';
  sourceMarker?: string;
  destinationMarker?: string;
}


interface WebViewRef {
  injectJavaScript: (script: string) => void;
}

const routing = () => {
  const { webViewRef, injectMarker, removeLastMarker, getCurrentCenter, setMapCenter } = useMapInteractions();
    const [source, setSource] = useState<Coordinates| null>(null);
    const [destination, setDestination] = useState<Coordinates| null>(null);
    const [selectingSource, setSelectingSource] = useState(true);
    const [show, setShow] = useState(false);
    const [selectedDate, setDate] = useState<Date>(new Date());
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const mapRef = useRef<MapView | null>(null);
    const [htmlFile, setHtmlFile] = useState('');
    // const webViewRef = useRef<WebViewRef| null>(null);
    const [sourceMarker, setSourceMarker] = useState<string>("");
    const [destinationMarker, setDestinationMarker] = useState<string>("");
    const [coordinates, setCoordinates] = useState({
      source: null,
      destination: null
    });
    const [region, setRegion] = useState<region>({
        latitude: 50.8513,  // Maastricht latitude
        longitude: 5.6909,  // Maastricht longitude
        latitudeDelta: 0.0922,  // Zoom level (vertical)
        longitudeDelta: 0.0421,  // Zoom level (horizontal)
    });

    const router = useRouter();

    const addTrip = useTripsStore((state) => state.addTrip)

    const handleSelectLocation = async () => {
      if (selectingSource) {
        enableMarking('source');
        const coordinates = await injectMarker('source');
        console.log("Got here");
        setSource(getCurrentCenter);
        setSelectingSource(false);
      } else {
        enableMarking('destination');
        const coordinates = await injectMarker('destination');

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
    const handleMessage = (event: WebViewMessageEvent): void => {
      console.log("Handling messages");
      try {
        const data = JSON.parse(event.nativeEvent.data);
        console.log('Received data from WebView:', data);
        // setCoordinates(data);
      } catch (error) {
        console.error('Error parsing WebView message:', error);
      }
    };

    const messageListener = (event: any) => {
      try {
        const message = JSON.parse(event.nativeEvent.data);
        if (message.type === 'getCurrentCenter') {
          setCoordinates(message.coordinates);
          resolve(message.coordinates);
          // Remove the listener once we have the data
          webViewRef.current?.removeEventListener('message', messageListener);
        }
      } catch (error) {
        reject(error);
      }
    };
    // const injectMarker = (type, coordinates) => {
    //   const { longitude, latitude } = coordinates;
    //   const functionName = type === 'source' ? 'setSourceMarker' : 'setDestinationMarker';
    //   webViewRef.current?.injectJavaScript(
    //     `window.mapFunctions.${functionName}(${longitude}, ${latitude});true;`
    //   );
    // };

    const handleBackButton = () => {
      if(!selectingSource && source){
        setSource(null);
        setSelectingSource(true);
        return true;
      }
      return false;
    }
    const onDateChange = (event: DateTimePickerEvent,  selectedDate?: Date) => {
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
      // Load the HTML file
      const loadHtml = async () => {
        const asset = Asset.fromModule(require('../assets/map.html'));
        await asset.downloadAsync();
        setHtmlFile(asset.uri);
      };
  
      loadHtml();
    }, []);


  // Load marker images
  useEffect(() => {
    const loadMarkerImages = async (): Promise<void> => {
      try {
        const [sourceAsset, destAsset] = await Promise.all([
          Asset.fromModule(require('../assets/Source.png')),
          Asset.fromModule(require('../assets/Destination.png'))
        ]);

        await Promise.all([
          sourceAsset.downloadAsync(),
          destAsset.downloadAsync()
        ]);

        setSourceMarker(sourceAsset.uri);
        setDestinationMarker(destAsset.uri);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading markers:', error);
        setIsLoading(false);
      }
    };

    loadMarkerImages();
  }, []);


  // Handle messages from WebView
  // const handleMessage = (event: WebViewMessageEvent): void => {
  //   try {
  //     const data = JSON.parse(event.nativeEvent.data) as Coordinates;
  //     setCoordinates(data);
  //   } catch (error) {
  //     console.error('Error parsing WebView message:', error);
  //   }
  // };

  const handleNavigationStateChange = (navState: WebViewNavigation): void => {
      console.log('WebView navigation state:', navState);
    };
  // const enableMarking = (mode: String) => {
  //   if(!webViewRef.current){
  //     return;
  //   }
  //   console.log("IN THIS ONE ", sourceMarker)
  //     webViewRef.current?.injectJavaScript(`
  //       window.handleMessage(JSON.stringify({
  //         action: 'enableMarking',
  //         mode: '${mode}',
  //         sourceMarker: '${sourceMarker}',
  //         destinationMarker: '${destinationMarker}'
  //       }));
  //       true;
  //     `);

  //   }
    
  const enableMarking = (mode: 'source' | 'destination'): void => {
    if (!webViewRef.current) return;

    const message: MarkerMessage = {
      action: 'enableMarking',
      mode,
      sourceMarker,
      destinationMarker
    };

    const script = `
      window.handleMessage(${JSON.stringify(message)});
      true;
    `;

    webViewRef.current.injectJavaScript(script);
  };

    
  // Remove last placed marker
  // const removeLastMarker = (): boolean => {
  //   if (!webViewRef.current) return false;

    // const message: MarkerMessage = {
    //   action: 'removeLastMarker'
    // };

    // const script = `
    //   window.handleMessage(${JSON.stringify(message)});
    //   true;
    // `;

  //   webViewRef.current.injectJavaScript(`window.mapFunctions.removeLastMarker();true;`);

  //   return true;
  // };

  //   useEffect(() => {
  //     BackHandler.addEventListener('hardwareBackPress', handleBackButton);

  //     return () => {
  //         BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  //     };
  // }, [selectingSource]);
    
      // Handle back button
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        removeLastMarker
      );
      return () => subscription.remove();
    }, [])
  );
    return (
        <SafeAreaView style={styles.container}>
           {/* <View style={styles.searchContainer}>
              
                </View> */}

            <WebView
                ref={webViewRef}
                source={{ uri: htmlFile }}
                // injectedJavaScript={INJECTED_JAVASCRIPT}
                // onMessage={handleMessage}
                onMessage={(event) => {
                  const data = JSON.parse(event.nativeEvent.data);
                  console.log('Received message from web:', data);
                  // Handle the received data here
                }}
              
                onNavigationStateChange={handleNavigationStateChange}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                // injectedJavaScript={injectedJavaScript}
                originWhitelist={['*']}
                onError={(syntheticEvent) => {
                  const { nativeEvent } = syntheticEvent;
                  console.warn('WebView error:', nativeEvent);
                }}
                onLoadStart={() => {
                  webViewRef.current?.injectJavaScript(`
                    console = {
                      log: function(message) {
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                          type: 'console',
                          message: message
                        }));
                      }
                    };
                  `);
                }}
              />

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
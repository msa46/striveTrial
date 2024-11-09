import * as Location from 'expo-location';
import { Controller, useForm } from 'react-hook-form';
import { Button, Platform, View, } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';


import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
// import {GOOGLE_MAPS_API_KEY} from "@/env";

// import { useForm } from 'react-hook-form';
const  planner = () => {
  const [currentLocation, setCurrentLocation] = useState({latitude:15, longitude:33, latitudeDelta: 0.0922, longitudeDelta: 0.0421,});
    const [show, setShow] = useState(false);
    const {control, handleSubmit} = useForm({defaultValues:{
      date:new Date(),
      source:{
        latitude: 0,
        longitude: 0
      },
      destination:{
        latitude: 0,
        longitude: 0
      },
    }});


    useEffect(() => {
      let currentLocationObject: any;
      const getloc = async () => {
        currentLocationObject = await Location.getCurrentPositionAsync({});
        setCurrentLocation((prevstate) => ({...prevstate,latitude:currentLocationObject.coords.latitude, longitude: currentLocationObject.coords.longitude}))
        console.log("Location Set!!")
      getloc();
    }}, [currentLocation]);
    const onSubmit = (data: any) => {
          console.log(data);
    }
    return (
    
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:"black"}}>
            {true &&
              <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={currentLocation}
                >
                <Controller
                  control={control}
                  name="source"
                  render={({ field: { onChange, value } }) => (
                    <Marker
                      draggable
                      coordinate={value || currentLocation}
                      onDragEnd={(e) => onChange(e.nativeEvent.coordinate)}
                      pinColor="green"
                      title="Source"
                    />

                   
               )}
                />

                <Controller
                  control={control}
                  name="destination"
                  render={({ field: { onChange, value } }) => (
                    <Marker
                      draggable
                      coordinate={value || {
                        ...currentLocation,
                        latitude: currentLocation.latitude + 0.01,
                      }}
                      onDragEnd={(e) => onChange(e.nativeEvent.coordinate)}
                      pinColor="red"
                      title="Destination"
                    />
                  )}
                />

          
              </MapView>
            
          }
     
        <Controller
          control={control}
          name="date"
          defaultValue={new Date()}
          render={({ field: { onChange, value } }) => (
            <>
              <Button onPress={() => setShow(true)} title="Show date picker" />
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={value}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShow(Platform.OS === 'ios');
                    if (event.type === 'set') {
                      onChange(selectedDate);
                    }
                  }}
                />
              )}
            </>
          )}
        />
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
)
}

export default planner;
import React, { useEffect, useState } from 'react';


import { useRootNavigationState, useRouter } from 'expo-router';
import { Text, View } from 'react-native';


const HomeScreen = () => {
  // router.push('./planner')

  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const [isNavigationReady, setIsNavigationReady] = useState(false);


  useEffect(() => {
    if (!rootNavigationState?.key && !isNavigationReady) {
      setIsNavigationReady(true);
    };
  }, [rootNavigationState, isNavigationReady]);

  useEffect(() => {
    if (!isNavigationReady) return;

    router.replace('./../routing');
  }, [isNavigationReady, router]);
  if (!rootNavigationState?.key) {
    return <View><Text>Loading...</Text></View>;
  }
  return (
    // <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >
    <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:"black"}}>
      <Text className="color-white">HOME</Text>
    </View>
  );
}



export default () => (
    <HomeScreen />
)


// const styles = StyleSheet.create({
//   flex:1,
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });

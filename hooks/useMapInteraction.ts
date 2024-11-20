// hooks/useMapInteractions.ts
import { useCallback, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { Coordinates, MarkerType } from '../types/map';

export const useMapInteractions = () => {
  const webViewRef = useRef<WebView | null>(null);

  const injectMarker = useCallback((type: MarkerType) => {
    const functionName = type === 'source' ? 'setSourceMarker' : 'setDestinationMarker';
    console.log("Function name is: ", functionName)
    console.log(webViewRef.current);
    if(type === 'source'){
      console.log("In Source if")
      webViewRef.current?.injectJavaScript(
        `window.mapFunctions.setSourceMarker();true;`
      );
      webViewRef.current?.injectJavaScript(
        `window.addMarker('source');true;`
      );
    }
    
    webViewRef.current?.injectJavaScript(
      `window.mapFunctions.${functionName}();true;`
    );
  }, []);

  const removeLastMarker = useCallback(() => {
    webViewRef.current?.injectJavaScript(
      `window.mapFunctions.removeLastMarker();true;`
    );
    return true;
  }, []);

  const setMapCenter = useCallback((coordinates: Coordinates, zoom?: number) => {
    const { longitude, latitude } = coordinates;
    webViewRef.current?.injectJavaScript(
      `window.mapFunctions.setCenter(${longitude}, ${latitude}, ${zoom || 12});true;`
    );
  }, []);

  const getCurrentCenter = useCallback((): Promise<Coordinates> => {
    return new Promise<Coordinates>((resolve) => {
      webViewRef.current?.injectJavaScript(`
        (function() {
          const center = window.mapFunctions.getCenterCoordinates();
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'getCurrentCenter',
            coordinates: center
          }));
        })();
        true;
      `);
    });
  }, []);

  return {
    webViewRef,
    getCurrentCenter,
    injectMarker,
    removeLastMarker,
    setMapCenter,
  };
};
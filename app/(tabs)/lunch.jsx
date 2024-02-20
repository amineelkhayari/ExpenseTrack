import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import { str } from '@/Interfaces/Storage';
import { Camera } from 'expo-camera';


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [displayText, setDisplayText] = useState("");

  const [User, SetUser] = useState("");

  //console.log(hasPermission, scanned);
  const isFocused = useIsFocused();

  const [test, SetTest] = useState(async () => {
    let va = await str.getData('Use')

    //selectedUser == va;
    alert(va)
    if (va === undefined) {
      alert("please Select user First")
      //navigation.goBack()
    }

    else {

      console.log(va)
      SetUser(va)
      //console.log(selectedUser,"Value get from Storage",va)
    }

  });

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    router.push({
      pathname: `/tes/detail`, params: { id: base64.atob(JSON.stringify(item)), user: userSelect }
    });


  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={{ flex: 1 }}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={(...args) => {
          const data = args[0].data;
          // let result = data;
          router.push({
            pathname: `/tes/detail`, params: { id: data, user: User }
          });
          setDisplayText(data)

        }}


      />
      <View style={styles.boxContainer}>
        <View style={{ marginBottom: 50 }}>
          <Text style={{ height: 40, width: 300, backgroundColor: 'white', marginBottom: 20 }}>{displayText}</Text>

        </View>
      </View>

      <View
        style={styles.scanBoxContainer}
      >
        <View style={styles.scanBox}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  boxContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    zIndex: 1
  },
  scanBoxContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    zIndex: 0,
  },
  scanBox: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: "white",
  }
});
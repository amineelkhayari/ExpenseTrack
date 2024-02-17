import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { Button, View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Share, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {base64} from "@/Interfaces/helper"

const IMG_HEIGHT = 300;
const { width } = Dimensions.get('window');

const page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const navigation = useNavigation();

  const shareListing = async () => {
    try {
      await Share.share({
        title: 'test',
        url: 'https:local.com',
      });
    } catch (err) {
      console.log(err);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: false,
      presentation: 'Modal',
      animation: 'fade',

      headerBackground: () => (
        <View style={[styles.header]}></View>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
            <Ionicons name="share-outline" size={22} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="heart-outline" size={22} color={'#000'} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={'#000'} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View >
      <Text>{base64.btoa(id)} Local</Text>
      
      <Button onPress={() => {

        // log out Buffer
        const bs64 = base64.atob("amine")
        alert(bs64)
        console.log(bs64)

       

      }} title="Encode" />
      <Button onPress={() => {

const ourBuffer = base64.btoa("YW1pbmU=");
// log out Buffer
alert(ourBuffer);
console.log(ourBuffer)

      }} title="Decode" />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 18,
    marginTop: 10,
  },
  rooms: {
    fontSize: 16,
    color: 'grey',
    marginVertical: 4,

  },
  ratings: {
    fontSize: 16,

  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'grey',
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'grey',
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    opacity: 0.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
  },

  description: {
    fontSize: 16,
    marginTop: 10,
  },
});
export default page
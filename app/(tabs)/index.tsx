import { users } from '@/constants/user';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { setBackgroundColorAsync } from 'expo-system-ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { Storage } from '@/Interfaces/Storage';


export default function TabOneScreen() {
  const [selectedUser, setselectedUser] = useState("0");
  const [t, SetT] = useState(false);
  const str = new Storage();
  useEffect(()=>{
    getUser()

  });
const getUser = async () => {
  const va = await str.getData('User')
  if(va != "undefined"){
    SetT(true)
    setselectedUser(va)
  }

}


  return (
    <SafeAreaView >


      {
        (t == false) ? (
          <>
            <View style={styles.radioGroup}>

              {users.map((user, index) => {
                return (

                  <View style={styles.radioButton}>
                    <RadioButton.Android
                      value={user.Name}
                      key={index * 4}
                      status={selectedUser === user.Name ?
                        'checked' : 'unchecked'}
                      onPress={() => setselectedUser(user.Name)}
                      color="#007BFF"
                    />
                    <Text style={styles.radioLabel}>
                      {user.Name}
                    </Text>
                  </View>
                );
              })}
            </View>

            <TouchableOpacity style={styles.textInput} onPress={() => {


              if (selectedUser != '0') {SetT(true)
                str.storeData('User', selectedUser);

              }
              else {

                alert("Please Select user ")
              }


            }}><Text style={{ textAlign: 'center' }}>Select User</Text></TouchableOpacity>

          </>

        ) : (

          <>
            <Text style={styles.title}> Welcome Back Mrs :: {selectedUser}</Text>

          </>
        )
      }


   


    </SafeAreaView >
  );
}

const styles = StyleSheet.create({

  radioGroup: {

    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    gap: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    bottom: 5,
    flexWrap: 'wrap',


  },
  radioButton: {
    textAlign: "center",
    alignItems: "center"

  },
  radioLabel: {
    textAlign: 'left'
  },
  textInput: {
    borderRadius: 12,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

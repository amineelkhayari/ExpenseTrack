import { users } from '@/constants/user';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper';
import { Storage } from '@/Interfaces/Storage';


export default function TabOneScreen() {
  const str = new Storage();

  const [selectedUser, setselectedUser] = useState("0");
  const [t, SetT] = useState(false);
  const [test, SetTest] = useState(async () => {
    let va = await str.getData('Use')
    //selectedUser == va;
    //alert(t)
    if(va === undefined) confirm(selectedUser)//setselectedUser(va)
    
    else{
      setselectedUser(va)
      SetT(true)
      //console.log(selectedUser,"Value get from Storage",va)
      return true;
    }

  });

 


  return (
    <SafeAreaView >
       
            <Text style={styles.title}> Welcome Back Mrs :: {selectedUser}</Text>

          

      {
        
       ( t===false ) && (
          <>
            <View style={styles.radioGroup}>

              {users.map((user, index) => {
                return (

                  <View style={styles.radioButton}>
                    <RadioButton.Android
                      value={user.Name}
                      key={user.Name}
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

            <TouchableOpacity key="StoreData" style={styles.textInput} onPress={() => {


              if (selectedUser != '0') {
                SetT(true)
                str.storeData('Use', selectedUser);

              }
              else {

                alert("Please Select user ")
              }


            }}><Text style={{ textAlign: 'center' }}>Select User</Text></TouchableOpacity>

          </>

        ) 
      }

      <TouchableOpacity key="GetData" style={styles.textInput} onPress={async () => {

                console.log("t Vallue",selectedUser)
                let vat = ( t===false) && 'lll';
        str.removeValue("Use")
        SetT(false)
        setselectedUser("0")
          console.log(t,"Data Load",vat)
          str.getAllKeys()


         // alert(await str.getData('User'));

      }}><Text style={{ textAlign: 'center' }}>Remove User</Text></TouchableOpacity>



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
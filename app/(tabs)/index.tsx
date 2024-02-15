import { users } from '@/constants/user';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, RadioButton } from 'react-native-paper';
import { str } from '@/Interfaces/Storage';
import { Feather } from '@expo/vector-icons';
import CustomListItem from '@/components/CustomListing';


export default function TabOneScreen() {
  //const str = new Storage();

  const [selectedUser, setselectedUser] = useState("0");
  const [t, SetT] = useState(false);
  const [test, SetTest] = useState(async () => {
    let va = await str.getData('Use')
    //selectedUser == va;
    //alert(t)
    if (va === undefined) confirm(selectedUser)//setselectedUser(va)

    else {
      setselectedUser(va)
      SetT(true)
      //console.log(selectedUser,"Value get from Storage",va)
      return true;
    }

  });




  return (
    <SafeAreaView style={styles.container}>




      {

        (t === false) ? (
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
                // dt.SetUpDataBase(`CREATE TABLE if NOT EXISTS categoery (
                //   IdCat INTEGER PRIMARY KEY AUTOINCREMENT,
                //   NameCat TEXT NOT NULL UNIQUE

                // );
                // `)

              }
              else {

                alert("Please Select user ")
              }


            }}><Text style={{ textAlign: 'center' }}>Select User</Text></TouchableOpacity>

          </>

        ) : (
          <><View style={styles.fullName}>
              <Avatar.Image size={60} source={require('../../assets/images/spending.png')} />


            <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Welcome Mrs :</Text>

              <Text style={{ color: '#4A2D5D', fontSize: 20 }}>
                {selectedUser}
              </Text>
            </View>
          </View><View style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={{ textAlign: 'center', color: 'aliceblue' }}>
                  Total Expense
                </Text>
                <Text style={{ fontSize:20,textAlign: 'center', color: 'aliceblue' }}>
                  $ 100
                </Text>
              </View>
              <View style={styles.cardBottom}>
                <View>
                  <View style={styles.cardBottomSame}>
                    <Feather name='arrow-down' size={18} color='green' />
                    <Text
                      style={{
                        textAlign: 'center',
                        marginLeft: 5,
                      }}
                    >
                      Credits
                    </Text>
                  </View>
                  <Text style={{ textAlign: 'center' }}>
                    {`$ 30`}
                  </Text>
                </View>
                <View>
                  <View style={styles.cardBottomSame}>
                    <Feather name='arrow-up' size={18} color='red' />
                    <Text style={{ textAlign: 'center', marginLeft: 5 }}>
                      Debts
                    </Text>
                  </View>
                  <Text style={{ textAlign: 'center' }}>
                    {`$ 15,00`}
                  </Text>
                </View>
              </View>
            </View>

            {/* Start for Recent Transaction */}

            <View style={styles.recentTitle}>
              <Text style={{ color: '#4A2D5D' }}>
                Recent Transactions
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => ""}
              >
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>


            {/* Loop for transaction */}

            <View style={styles.recentTransactions}>
              {/* loop */}
              <View key="1">
                <CustomListItem
                  info=""
                  navigation=""
                  id=""
                />
              </View>
              {/* endLoop */}
            </View>



          </>
        )
      }

      {/* Design Partie Balance Expense And Credit And Debt */}
      <View style={styles.container}>

      </View>

      {/* <TouchableOpacity key="GetData" style={styles.textInput} onPress={async () => {

        //         console.log("t Vallue",selectedUser)
        let vat = (t === false) && 'lll';
        str.removeValue("Use")
        SetT(false)
        setselectedUser("0")
        //   console.log(t,"Data Load",vat)
        // str.getAllKeys()

        dt.getFromTable('SELECT * FROM categoery WHERE IdCat = ?  ', [1])

        //

        // alert(await str.getData('User'));

      }}><Text style={{ textAlign: 'center' }}>Remove User</Text></TouchableOpacity> */}



    </SafeAreaView >
  );
}

const styles = StyleSheet.create({

  radioGroup: {
    width: '100%',
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
    padding: 10,



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
    width: "100%"
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
  },
  fullName: {
    flexDirection: 'row',
  },
  card: {
    backgroundColor: '#535F93',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginVertical: 20,
  },
  cardTop: {
    // backgroundColor: 'blue',
    marginBottom: 20,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    margin: 'auto',
    backgroundColor: '#E0D1EA',
    borderRadius: 5,
  },
  cardBottomSame: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  recentTransactions: {
    backgroundColor: 'white',
    width: '100%',
  },
  seeAll: {
    fontWeight: 'bold',
    color: 'green',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  plusButton: {
    backgroundColor: '#535F93',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  containerNull: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },

});
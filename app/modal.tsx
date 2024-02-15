import { StatusBar } from 'expo-status-bar';
import { Button, Dimensions, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { users } from '@/constants/user';
import { str } from '@/Interfaces/Storage';
import { useNavigation } from 'expo-router';


export default function ModalScreen() {
  const navigation = useNavigation();

  const [Title, SetTitle]: any = useState();
  const [PayedBy, SetPayedBy]: any = useState();
  const [Amount, setAmount]:any = useState();
  const [Structure, SetStructure]: any = useState();

  const [data, setUserData]: any = useState()
  const [test, SetTest] = useState<any>(async () => {
    let va = await str.getData('Use')
    //selectedUser == va;
    //alert(t)
    if (va === undefined) {
      alert("please Select user First")
      navigation.goBack()
    }

    else {
      SetPayedBy(va)
      SetTest(va)
      return va;
      //console.log(selectedUser,"Value get from Storage",va)
    }

  });


  const add = () => {
    alert(1)
    // Create an instance of Database
    //const db = new Database();

    // Define table structure
    const userColumns = ['name', 'age'];


    // Create user table







  }

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'dark'} />

      <Text style={styles.heading3}>Add An Expense </Text>

      {/* Input field for expense name */}
      <Text style={styles.label}>Expense Name</Text>
      <TextInput
        onChangeText={(value) => SetTitle(value)}
        style={styles.textInput}
        placeholder="Enter the expense name"
        value={Title}
      />
      {/* Input field for expense Amount */}
      <Text style={styles.label}>Amount</Text>
      <TextInput
        keyboardType="number-pad"
        onChangeText={(value) => {
          // Ensure only numeric values are entered for the Amount
          value = value.replace(/[^0-9]/g, "");
          setAmount(value)
        }}
        value={Amount}
        style={styles.textInput}
        placeholder="[0-9]"
      />



      <Text style={styles.label}>Pay By</Text>

      <Picker
        style={styles.textInput}
        selectedValue={PayedBy}
        onValueChange={(itemValue, itemIndex) => {
          SetPayedBy(itemValue)
        }}
      >
        {users.map((user, index) => {
          return (
            <Picker.Item
              key={user.ID}
              label={user.Name === test ? "Me " : user.Name}
              value={user.Name}
            />
          );
        })}
      </Picker>


      <View style={styles.row}>
        {/* Add Expense button */}
        <Button
          key="Add"

          onPress={() => {
            add();
            // Update the chart data to reflect the new expense

          }}
          title="Add"

        />

        {/* Cancel button to close the form
					without adding an expense */}
        <Button
          onPress={() => { }}
          title="Cancel"
          key="Cancel"
        />
      </View>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
    </View>
  );





}

const styles = StyleSheet.create({
  placesContainer: {
    flexDirection: 'row',
    gap: 25,
  },
  place: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  placeSelected: {
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 10,
    width: 100,
    height: 100,
  },
  cardHeader: {
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  previewText: {
    fontSize: 14,
    color: 'grey',
  },
  previewdData: {
    fontSize: 14,
    color: '#333',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    bottom: 5,
    position: "absolute",
    width: "100%",
    height: 50,
    gap: 25,
    alignItems: "center",

  },
  container: {
    backgroundColor: "#fff",
    height: "100%",

  },
  heading: {
    color: "green",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  addButton: {
    padding: 10,
    margin: 10,
  },
  heading2: {
    color: "black",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  heading3: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },
  label: {
    color: "black",
    fontSize: 16,
    textAlign: "left",
    fontWeight: "bold",
    marginLeft: 10,
  },
  expenseTile: {
    // column with 3 cells
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "lightgrey",
    width: "95%",
    padding: 10,
    margin: 10,
  },
  expenseTileText: {
    fontSize: 20,
    width: "22%",
    textAlign: "center",
  },
  formAdd: {
    // display: "none",
  },
  textInput: {
    borderRadius: 12,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
});

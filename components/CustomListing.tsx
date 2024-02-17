import { Expense, Expenses } from '@/Interfaces/Users';
import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type ItemData = {
  id: string;
  title: string;
};
type Props = {
  expenseList:any,
  userLocal:string
}
const Exponse:Expenses =[
  {
     "Amount":20,
     "DateExpense":"2024-02-17 11:16:03",
     "ID":1,
     "IdSubCat":2,
     "NameCat":"Food",
     "NameSubCat":"Banan",
     "PayedBy":"Mohammed",
     "PaymentTransaction":"Mohammed1708164951143",
     "Structure":"{\"shared\":[],\"Payed\":[]}",
     "Title":"Test",
     "catID":1
  },
  {
     "Amount":50,
     "DateExpense":"2024-02-17 11:16:20",
     "ID":2,
     "IdSubCat":3,
     "NameCat":"Transport",
     "NameSubCat":"Train",
     "PayedBy":"Jounir",
     "PaymentTransaction":"Mohammed1708164963048",
     "Structure":"{\"shared\":[1,2,4],\"Payed\":[]}",
     "Title":"Ekehd",
     "catID":2
  }
]

const DATA: ItemData[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3acafc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-47d96-145571e29d72',
    title: 'Third Item',
  },{
    id: '58694a0f-471f-bd96-145571e29d72',
    title: 'Third Item',
  },{
    id: '58694a0f-3da1-471f96-145571e29d72',
    title: 'Third Item',
  },{
    id: '58694a0f-3da1-471f-bd96-1451e29d72',
    title: 'Third Item',
  },{
    id: '58694a0f-3da1-471f-bd96-145571e272',
    title: 'Third Item',
  },{
    id: '58694a0f-3da1-471f-bd96-145571e29d',
    title: 'Third Item',
  },{
    id: '58694a0f-3da1-471f-bd96',
    title: ' ---------',
  },
];

type ItemProps = {
  item: Expense;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  userSelect:string
};

const Item = ({ item,userSelect, onPress, backgroundColor, textColor }: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
    <View>
    <Text style={[ { color: textColor }]}>This Item `{item.Title}`</Text>
    <Text  style={[ { color: textColor }]}>Payed By: {item.PayedBy}</Text>
    <Text  style={[ { color: textColor }]}>Payment Transsaction: Amine11334</Text>

    </View>
    <View>
      
        
      
    <Text style={[ { color: item.PayedBy==userSelect ? 'red': 'green' }]}>- $ {item.PayedBy==userSelect ? item.Amount : item.Amount/(JSON.parse(item.Structure).shared.length+1)}</Text>
    {
      item.PayedBy!=userSelect && (
        <Text style={[ { color: item.PayedBy== userSelect ? 'red': 'green', textAlign:"center" }]}> / {item.Amount}</Text>

      )
    }
    </View>

  </TouchableOpacity>
);

const CustomListItem = ({expenseList,userLocal}:Props) => {
  const [selectedId, setSelectedId] = useState<number>();

  const renderItem = ({ item }: { item: Expense }) => {
    const backgroundColor = item.ID === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.ID === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        userSelect={userLocal}
        onPress={() => setSelectedId(item.ID)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={expenseList}
        renderItem={renderItem}
      
        keyExtractor={item => item.PaymentTransaction}
        extraData={selectedId}
      />
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:"center"
  },
  title: {
    fontSize: 20,
  },
});

export default CustomListItem;
import { Expense, Expenses } from '@/Interfaces/Users';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {base64} from "@/Interfaces/helper"

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
    <Text  style={[ { color: textColor }]}>Payment Transsaction: {item.PaymentTransaction}</Text>

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
      <Link href={`/detail/${base64.atob(JSON.stringify(item))}`} asChild>

      
      <Item
        item={item}
        userSelect={userLocal}
        onPress={() => setSelectedId(item.ID)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
</Link>
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
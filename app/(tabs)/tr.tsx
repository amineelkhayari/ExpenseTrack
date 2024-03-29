import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { db, IData } from '@/Interfaces/DbSet'; // Assuming this import is correct
import { Calculate, str } from '@/Interfaces/Storage';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { Expense, Users } from '@/Interfaces/Users';
import { useLocalSearchParams } from 'expo-router';

// Sample sales data
const salesData = [
  { product: 'Product A', date: '2024-02-20', total_revenue: 1200 },
  { product: 'Product A', date: '2024-02-20', total_revenue: 1200 },
  { product: 'Product A', date: '2024-02-21', total_revenue: 800 },
  { product: 'Product B', date: '2024-02-20', total_revenue: 1200 },
  { product: 'Product B', date: '2024-02-21', total_revenue: 1500 },
  { product: 'Product C', date: '2024-02-21', total_revenue: 600 }
];



const coupage = (data: any[], groupeBy: string) => {
  const uniqueDates = [...new Set(data.map(item => item[groupeBy]))];
  // Prepare data for FlatList
  const groupedData = uniqueDates.map(date => ({
    date,
    data: data.filter(item => item[groupeBy] === date)
  }));

  return groupedData;
}

export default function App() {
  // Function to render sales data details
  const renderItem = ({ item }: { item: any }) => {
    let users: any = JSON.parse(item.Structure).Payed;
    let lengthUser: number = users.length;
    return (
      <View style={{
        marginLeft: 20, backgroundColor: item.PayedBy != selectedUser ? '#fff' : '#f3f3f3',
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
        padding:10
      }}>
        <View style={{}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text> Title        : {`${item.Title}`}</Text>
            <Text> Totale Price : ${(item.Amount).toFixed(2)}</Text>

          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <Text> Payed By: {item.PayedBy} </Text>
            <Text>Users Lenght: {lengthUser + 1}</Text>
          </View>
        </View>

        <View style={{
          flexDirection: 'row', justifyContent: "space-evenly",

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
          padding: 10

        }}>
          {lengthUser > 0 &&
            users.map((it: any) => {
              if (it.Name === selectedUser)
                return <View style={{ alignItems: "center" }}>
                  <Text style={{ color: it.Payed ? "green" : "red" }}>{it.Name}</Text>
                  <Text>{item.Amount / (lengthUser + 1)}</Text>

                </View>
              if (item.PayedBy === selectedUser)
                return <View style={{ alignItems: "center" }}>
                  <Text style={{ color: it.Payed ? "green" : "red" }}>{it.Name}</Text>
                  <Text>{item.Amount / (lengthUser + 1)}</Text>
                </View>
            })
          }
        </View>

      </View>
    );
  }

  const [dt, setDt] = useState<any[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const [selectedUser, setselectedUser] = useState<string>("");


  const [ExpenseAmount, setExpenseAmount]: any = useState();
  const [CreditAmount, setCreditAmount] = useState<any>();
  const [DebtAmount, setDebtsAmount] = useState<any>();
  const [calculate, SetCalculate] = useState<Calculate>();
  const params = useLocalSearchParams();





  useEffect(() => {
    toggleDetails();



  }, [data]);
  const Calculate = () => {
    let exp = 0
    let debt = 0
    let credit = 0


    // //console.log(data)
    // data.map((item: any, index: number) => {
    //   let usercreadit = JSON.parse(item.Structure);
    //   let lenghtUser = usercreadit["Payed"].length;
    //   if (item.PayedBy === selectedUser) {
    //     exp += item.Amount;

    //     usercreadit.Payed.forEach((it: any) => {
    //       if (!it.Payed) {
    //         credit += item.Amount / (lenghtUser + 1);

    //       } else {
    //         exp -= item.Amount / (lenghtUser + 1);
    //       }

    //     });
    //   } else {
    //     usercreadit.Payed.forEach((it: any) => {
    //       if (it.Name === selectedUser) {
    //         //console.log(usercreadit.Payed[i].Payed)
    //         if (it.Payed) {
    //           //console.log("expense: "+(exp+item.Amount/(userLenght+1)))
    //           exp += item.Amount / (lenghtUser + 1)
    //         } else {
    //           //console.log("Debts: "+item.Amount/(userLenght+1))
    //           debt += item.Amount / (lenghtUser + 1);

    //         }


    //       }


    //     });
    //   }




    // }
    // )
    // setDebtsAmount(debt)
    // setExpenseAmount(exp)
    // setCreditAmount(credit)

  }

  const toggleDetails = async () => {
    let query: string = "";
    switch (params?.name) {
      case "debt":
        query = `SELECT *,strftime('%Y-%m-%d', DateExpense) as 'date'
        FROM Expense  WHERE strftime('%m', DateExpense) = strftime('%m', datetime('now','localtime'))
        GROUP BY  DateExpense
        ORDER BY  DateExpense DESC`
        break;
      case "credit":
        break;
      default:
        query = `SELECT *,strftime('%Y-%m-%d', DateExpense) as 'date'
        FROM Expense  WHERE strftime('%m', DateExpense) = strftime('%m', datetime('now','localtime'))
        AND
        PayedBy !="${selectedUser}"
        GROUP BY  DateExpense
        ORDER BY  DateExpense DESC`
    }


    let req = params?.name == undefined ? `SELECT *,strftime('%Y-%m-%d', DateExpense) as 'date'
    FROM Expense  WHERE strftime('%m', DateExpense) = strftime('%m', datetime('now','localtime'))
    GROUP BY  DateExpense
    ORDER BY  DateExpense DESC` : `SELECT *,strftime('%Y-%m-%d', DateExpense) as 'date'
    FROM Expense  WHERE strftime('%m', DateExpense) = strftime('%m', datetime('now','localtime'))
	AND
		PayedBy !="${selectedUser}"
    GROUP BY  DateExpense
    ORDER BY  DateExpense DESC`
    db.fetchDataQuery(req, setData);
    setDt(coupage(data, "date"));
    await str.getTest('Use', setselectedUser)

    //console.log(data)

    //setDt(coupage(data, "date"));
    //Calculate()
    str.CalculateExpense(selectedUser, data, SetCalculate)

    setDebtsAmount(calculate?.Debt)
    setExpenseAmount(calculate?.Expense)
    setCreditAmount(calculate?.Credit)
    console.log("from Storage ", calculate)

  };

  return (
    <ScrollView>


      <View style={{}}>
        <Text>{selectedUser} Expense: {ExpenseAmount} || Debt Amount : {DebtAmount} Craedit: {CreditAmount}</Text>
        {dt.map((item, index) => {

          const expensebydate: Calculate = str.CalculateExpense(selectedUser, item.data)
          return (
            <View >
              <View
                style={{ backgroundColor: '#ccc', padding: 10, flexDirection: 'row', justifyContent: 'space-around' }}
              >
                <Text>{item.date}</Text>
                <Text>Expense: ${expensebydate.Expense} | Credit: ${expensebydate.Credit}| Debt: ${expensebydate.Debt}</Text>
              </View>
              <FlatList
                data={item.data}
                renderItem={renderItem}
                keyExtractor={(item) => item.data}
              />
            </View>
          )
        }

        )}
      </View>
    </ScrollView>
  );
}

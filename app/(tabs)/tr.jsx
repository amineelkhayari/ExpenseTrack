import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

// Sample sales data
const salesData = [
  { product: 'Product A', date: '2024-02-20', total_revenue: 1200 },
  { product: 'Product A', date: '2024-02-20', total_revenue: 1200 },
  { product: 'Product A', date: '2024-02-21', total_revenue: 800 },
  { product: 'Product B', date: '2024-02-20', total_revenue: 1200 },
  { product: 'Product B', date: '2024-02-21', total_revenue: 1500 },
  { product: 'Product C', date: '2024-02-21', total_revenue: 600 }
];

const decoup = (data, groupeBy) => {
  const groupedData = {};

  data.forEach(rowData => {
    if (!groupedData[rowData[groupeBy]]) {
      groupedData[rowData[groupeBy]] = [];
    }
    groupedData[rowData[groupeBy]].push(rowData);
  });
  return groupedData;
}
const coupage = (data, groupeBy) => {

  const uniqueDates = [...new Set(data.map(item => item[groupeBy]))];
  console.log(uniqueDates)
  // Prepare data for FlatList
  const groupedData = uniqueDates.map(date => ({
    date,
    data: data.filter(item => item[groupeBy] === date)
  }));


  return groupedData;
}

export default function App() {
  // Function to render sales data details
  const renderItem = ({ item }) => (
    <View style={{ marginLeft: 20 }}>
      <Text>{`${item.product}: $${item.total_revenue}`}</Text>
    </View>
  );
  const [dt, SetDt] = useState([]);

  const [dtt, SetDtt] = useState(() => {
    SetDt(coupage(salesData, "date"))

  });





  const toggleDetails = (date) => {
    //console.log(data.filter(item=> item.date === date)[0].data)
    // Logic to toggle visibility of details for a particular date
    // You may use state to manage visibility if you want to track the state of each date separately
  };
  // Extract unique dates
  const uniqueDates = [...new Set(salesData.map(item => item.date))];

  // Prepare data for FlatList
  const data = uniqueDates.map(date => ({
    date,
    data: salesData.filter(item => item.date === date)
  }));
  return (
    <View style={{}}>

      {
        dt.map((item, index) => {
          return (
            <>
              <TouchableOpacity key={item.data} style={{ backgroundColor: '#ccc', padding: 10 }}
              >
                <Text>{item.date}</Text>
              </TouchableOpacity>
              <FlatList
                      data={item.data}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.date}
                    />
              {/* {
                item.data.map((dataa, index) => {
                  return (
                    <FlatList
                      data={dataa}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.date}
                    />
                  )
                })
              } */}

            </>
          )
        })
      }

    </View>
  );
}

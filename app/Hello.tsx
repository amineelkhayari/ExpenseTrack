import React, { useState, useEffect, FC } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { db, IData } from '@/Interfaces/DbSet';

const SubCatCRUD = () => {
  const [tasks, setTasks] = useState<IData[]>([]);
  const [Category, SetCategory]: any = useState();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    db.fetchData('category', setTasks);
    console.log(tasks)
    //db.fetchDataQuery("SELECT SUM(Amount) FROM Expense",setTask)
  };

  const addTask = () => {

    db.addItem('category', { NameCat: Category.trim() }, fetchData);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sub CategoryCategory:</Text>
      <TextInput value={Category}
        placeholder='food'
        onChangeText={(val) => SetCategory(val)} />
      {tasks.map(task => (
        <Text key={task.ID}>{task.ID}:{task.NameCat}</Text>
      ))}
      <Button onPress={addTask} title="Add Task" />
    </View>
  );

}






export { SubCatCRUD };

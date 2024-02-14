import React, { useState, useEffect,FC } from 'react';
import { View, Text, Button } from 'react-native';
import Database,{IData} from '@/Interfaces/DbSet';


const TaskScreen: FC = () => {
  const [tasks, setTasks] = useState<IData[]>([]);
  const db = new Database();

  useEffect(() => {
    db.createTable('tasks', ['title', 'description']);
    fetchData();
  }, []);

  const fetchData = () => {
    db.fetchData('tasks', setTasks);
  };

  const addTask = () => {
    db.addItem('tasks', { title: 'New ', description: 'Description' }, fetchData);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tasks:</Text>
      {tasks.map(task => (
        <Text key={task.id}>{task.title}</Text>
      ))}
      <Button onPress={addTask} title="Add Task" />
    </View>
  );
};



export { TaskScreen };

import React, { useState, useEffect, FC } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { db, IData } from '@/Interfaces/DbSet';
import { Picker } from '@react-native-picker/picker';








export default function Test() {
    const [tasks, setTasks] = useState<IData[]>([]);
    const [t, setTask] = useState<IData[]>([]);
    const [catSelected, SetCatSelect] = useState(0);

    const [Category, SetCategory]: any = useState();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        db.fetchData('subCategory', setTasks);
        db.fetchData('category', setTask);


        //db.fetchDataQuery("SELECT SUM(Amount) as expense FROM Expense",setTask)
    };

    const addTask = () => {

        db.addItem('subCategory', { NameSubCat: Category.trim(), catID: catSelected }, fetchData);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Picker
                style={{ width: "100%" }}
                selectedValue={catSelected}
                onValueChange={(itemValue, itemIndex) => {
                    SetCatSelect(itemValue)
                }}
            >
                <Picker.Item
                    key={0}
                    label="Choose Cat"
                    value={0}
                />
                {t.map((user, index) => {
                    return (
                        <Picker.Item
                            key={user.ID}
                            label={user.NameCat}
                            value={user.ID}
                        />
                    );
                })}
            </Picker>
            <Text>Choose Category:</Text>
            <TextInput value={Category}
                placeholder='food'
                onChangeText={(val) => SetCategory(val)} />
            {tasks.map(task => (
                <Text key={task.ID}>{task.ID}:{task.NameSubCat}</Text>
            ))}
            <Button onPress={addTask} title="Add Subcategory" />
        </View>
    );
};




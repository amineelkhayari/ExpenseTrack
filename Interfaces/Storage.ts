import AsyncStorage from '@react-native-async-storage/async-storage';


export class Storage{
constructor(){}


 storeData = async (key:string,value:any) => {
    try {
        const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem(key, jsonValue);
      
    } catch (e) {
      // saving error
    }
  };
   getData = async (key:string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // value previously stored
        let val = JSON.parse(value);
        return val
      }
    } catch (e) {
      // error reading value
      return 'error'
    }
  };

}
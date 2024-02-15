import AsyncStorage from '@react-native-async-storage/async-storage';


// generic Class Reusable for All App
class Storage{
constructor(){}

  // Method for save Data On lcoal storage
 storeData = async (key:string,value:any) => {
    try {
        const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem(key, jsonValue);
      
    } catch (e) {
      // saving error
    }
  };
    // Method for get Data from lcoal storage

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

  // get data with fetch it to json
  getDataObject = async (key:string) => {
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


// remove a data store
  removeValue = async (key:string) => {
    try {
      let val = await AsyncStorage.removeItem(key);
      console.log("remove : ", val)
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }
  // show All Keys
  getAllKeys = async () => {
    let keys:any = []
    try {
      keys = await AsyncStorage.getAllKeys()
      console.log("Keys",keys)
    } catch(e) {
      // read key error
    }
  
    console.log(keys)
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  }




  // clear All Storage

  clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }


}

export const str: Storage = new Storage();

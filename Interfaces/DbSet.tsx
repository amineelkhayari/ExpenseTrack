
import * as SQLite from 'expo-sqlite';



export interface IData {
  id: number;
  [key: string]: any;
}

class Database {
  db: SQLite.Database;

  constructor() {
    this.db = SQLite.openDatabase('local.db');
  }

  createTable = (tableName: string, columns: string[]) => {
    const columnsString = columns.map(col => `${col} TEXT`).join(', ');
    this.db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, ${columnsString});`
      );
    });
    console.log("Data base Created")
  };

  fetchData = (tableName: string, setData: React.Dispatch<React.SetStateAction<IData[]>>) => {
    this.db.transaction(tx => {
      tx.executeSql(`SELECT * FROM ${tableName};`, [], (_, { rows }) => {
        const items: IData[] = [];
        for (let i = 0; i < rows.length; i++) {
          items.push(rows.item(i));
        }
        setData(items);
        console.log(setData)
      });
    });
  };

  addItem = (tableName: string, data: Partial<IData>, fetchData: () => void) => {
    const columns = Object.keys(data).join(',');
    const placeholders = Object.keys(data).fill('?').join(',');
    const values = Object.values(data);
    this.db.transaction(tx => {
      tx.executeSql(`INSERT INTO ${tableName} (${columns}) VALUES (${placeholders});`,
       values, 
       (txtObj, res) => {
        console.log("data: ",res.insertId)
        fetchData();
      });
    });
  };
}

export default Database;

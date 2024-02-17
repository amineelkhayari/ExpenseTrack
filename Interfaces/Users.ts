export interface Users {
    ID: number;
    Name: string;
    isChecked: boolean
  }

  export type Expenses = Expense[]

export interface Expense {
  Amount: number
  DateExpense: string
  ID: number
  IdSubCat: number
  NameCat: string
  NameSubCat: string
  PayedBy: string
  PaymentTransaction: string
  Structure: string
  Title: string
  catID: number
}

export interface StrType {
  shared:number[],
  Payed:number[]
 }
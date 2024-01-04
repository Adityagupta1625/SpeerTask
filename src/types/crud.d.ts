import { type Document, type Model } from 'mongoose'


interface BaseCRUDMethods<T extends Document> {

  addData: (data: any) => Promise<any>

  
  findbyId: (id: string) => Promise<T | null>

 
  findAll: () => Promise<T[]>


  update: (id: string, data: any) => Promise<T | null>


  delete: (id: string) => Promise<void>

 
  findbyField: (key: string, value: string) => Promise<T[]>

   findOnebyField: (key: string, value: string) => Promise<T | null>
}

type CRUDBaseType<T extends Document> = new (baseModel: Model<T>) => {
  baseModel: Model<T>
} & BaseCRUDMethods<T>

type CRUDBaseInstance<T extends Document> = InstanceType<CRUDBaseType<T>>

export default CRUDBaseInstance

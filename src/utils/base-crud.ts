import { type Document, type Model } from 'mongoose'
import HttpException from './http-exception'

export abstract class CRUDBase<T extends Document> {
  
  public baseModel: Model<T>

  
  constructor (baseModel: Model<T>) {
    this.baseModel = baseModel
  }

  public async addData (data: any): Promise<T> {
    try {
      return await this.baseModel.create(data)
    } catch (e) {
      throw new HttpException(500, e)
    }
  }


  public async findbyId (id: string): Promise<T | null> {
    try {
      if (id==='' || id===null) {
        throw new HttpException(400, 'Invalid ID')
      }

      return await this.baseModel.findById(id)
    } catch (e) {
      throw new HttpException(500, e)
    }
  }


  public async findAll (): Promise<T[]> {
    try {
      return await this.baseModel.find({})
    } catch (e) {
      throw new HttpException(500, e)
    }
  }


  public async update (id: string, data: any): Promise<T | null> {
    try {
      if (id==='' || id===null) {
        throw new HttpException(400, 'Invalid ID')
      }

      const doc = await this.baseModel.findByIdAndUpdate(id, data, {
        new: true
      })

      return doc
    } catch (e) {
      throw new HttpException(500, e)
    }
  }


  public async delete (id: string): Promise<void> {
    try {
      if (id==='' || id===null) {
        throw new HttpException(400, 'Invalid ID')
      }

      await this.baseModel.findByIdAndDelete(id)
    } catch (e) {
      throw new HttpException(500, e)
    }
  }

  
  public async findbyField (key: string, value: string): Promise<any> {
    try {
      if (key === null || key === undefined) {
        throw new HttpException(400, 'Invalid data')
      }

      if (value === null || value === undefined) {
        throw new HttpException(400, 'Invalid data')
      }

      const query: any = {}
      query[key] = value
      return await this.baseModel.find(query)
    } catch (e) {
      throw new HttpException(500, e)
    }
  }


  public async findOnebyField (key: string, value: string): Promise<T | null> {
    try {
      if (key === null || key === undefined) {
        throw new HttpException(400, 'Invalid data')
      }

      if (value === null || value === undefined) {
        throw new HttpException(400, 'Invalid data')
      }

      const query: any = {}
      query[key] = value

      return await this.baseModel.findOne(query)
    } catch (e) {
      throw new HttpException(500, e)
    }
  }
}

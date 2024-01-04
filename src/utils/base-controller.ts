import { type Request, type Response } from 'express'
import type CRUDBaseType from '../types/crud'
import { type Document } from 'mongoose'
import type HttpExceptionInterface from '../types/http-exception'

export abstract class BaseController {
  
  public crudService: CRUDBaseType<Document>

  constructor (crudService: any) {
    this.crudService = crudService
  }


  public async addController (req: Request, res: Response): Promise<Response> {
    try {
      await this.crudService.addData(req.body)
      return res.status(201).json({ message: 'Data added successfully!!' })
    } catch (e: unknown) {
      const err = e as HttpExceptionInterface
      return res
        .status(err?.errorCode ?? 500)
        .json({ message: err?.message ?? 'Internal Server Error' })
    }
  }

  
  public async getAllController (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const doc = await this.crudService.findAll()
      return res.status(200).json(doc)
    } catch (e: unknown) {
      const err = e as HttpExceptionInterface
      return res
        .status(err?.errorCode ?? 500)
        .json({ message: err?.message ?? 'Internal Server Error' })
    }
  }

  
  public async getByIdController (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      if (req.params.id===null || req.params.id==='') {
        return res.status(400).json({
          message: 'Invalid id provided'
        })
      }

      const doc = await this.crudService.findbyId(req.params.id)
      return res.status(200).json(doc)
    } catch (e: unknown) {
      const err = e as HttpExceptionInterface
      return res
        .status(err?.errorCode ?? 500)
        .json({ message: err?.message ?? 'Internal Server Error' })
    }
  }


  public async updateController (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      
      if (req.params.id===null || req.params.id==='') {
        return res.status(400).json({
          message: 'Invalid id provided'
        })
      }

      const doc = await this.crudService.update(req.params.id, req.body)
      return res.status(200).json(doc)
    } catch (e: unknown) {
      const err = e as HttpExceptionInterface
      return res
        .status(err?.errorCode ?? 500)
        .json({ message: err?.message ?? 'Internal Server Error' })
    }
  }

  public async deleteController (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      if (req.params?.id===null || req.params?.id==='') {
        return res.status(400).json({
          message: 'Invalid id provided'
        })
      }

      await this.crudService.delete(req.params.id)
      return res.status(204).json({ message: 'Data Deleted Succesfully!!' })
    } catch (e: unknown) {
      const err = e as HttpExceptionInterface

      return res
        .status(err?.errorCode ?? 500)
        .json({ message: err?.message ?? 'Internal Server Error' })
    }
  }
}

import { BaseController } from "../../../utils/base-controller";
import { notesCRUD } from "../crud";
import type HttpExceptionInterface from '../../../types/http-exception'
import {Request,Response} from 'express'

class NotesController extends BaseController{
    constructor(){
        super(notesCRUD)
    }
    
    public async addController (req: Request, res: Response): Promise<Response> {
        try {
          await this.crudService.addData({
            note: req.body.note,
            userId: req.query.userId
          })
          return res.status(201).json({ message: 'Data added successfully!!' })
        } catch (e: unknown) {
          const err = e as HttpExceptionInterface
          return res
            .status(err?.errorCode ?? 500)
            .json({ message: err?.message ?? 'Internal Server Error' })
        }
      }

}

const notesController=new NotesController()

export default notesController
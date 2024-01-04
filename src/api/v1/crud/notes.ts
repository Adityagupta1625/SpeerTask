import { CRUDBase } from "../../../utils/base-crud";
import { NotesSchema } from "../types";
import {NotesModel} from '../models'
import HttpException from "../../../utils/http-exception";

class NotesCRUD extends CRUDBase<NotesSchema>{

    constructor(){
        super(NotesModel)
    }

    public async findNotes(query: string) : Promise<NotesSchema[]> {
        try{
            const notes = await this.baseModel.find({$text : {$search : query}})
            return notes
        }
        catch(e){
            throw new HttpException(500,e)
        }
    }
}

const notesCRUD=new NotesCRUD()

export default notesCRUD
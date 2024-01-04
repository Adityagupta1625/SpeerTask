import { NotesSchema } from "../types"
import {Schema, model,Types} from 'mongoose'

const notesSchema=new Schema<NotesSchema>({
    note: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, required: true},
},{
    timestamps: true
})

notesSchema.index({ note: 'text' });

const NotesModel=model<NotesSchema>('Notes',notesSchema)

export default NotesModel
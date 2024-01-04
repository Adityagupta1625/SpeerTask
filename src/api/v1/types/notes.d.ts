import {Document,Types} from 'mongoose'

interface NotesSchema extends Document{
    note: string
    userId: Types.ObjectId
}

export default NotesSchema
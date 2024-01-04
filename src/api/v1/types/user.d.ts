import {Document,Types} from 'mongoose'

interface UserSchema extends Document{
    _id: Types.ObjectId
    email: string
    password: string
}

export default UserSchema
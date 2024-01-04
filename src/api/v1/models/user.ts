import { UserSchema } from "../types"
import {Schema, model} from 'mongoose'

const userSchema=new Schema<UserSchema>({
    email:{type: String,required: true},
    password: {type: String,required: true}
},{
    timestamps: true
})

const UserModel=model<UserSchema>('User',userSchema)

export default UserModel
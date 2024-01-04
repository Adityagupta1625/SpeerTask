import { CRUDBase } from "../../../utils/base-crud";
import { UserSchema } from "../types";
import {UserModel} from '../models'
import HttpException from "../../../utils/http-exception";

class UserCRUD extends CRUDBase<UserSchema>{

    constructor(){
        super(UserModel)
    }

    public async getUserByEmail(email: string): Promise<UserSchema|null> {
        try{
            if(!email || email==='') throw new HttpException(400,'email not provided')

            const user: UserSchema|null =await this.baseModel.findOne({email: email})

            return user
        }
        catch(e){
            throw new HttpException(500,e)
        }
    }
}

const userCRUD=new UserCRUD()

export default userCRUD
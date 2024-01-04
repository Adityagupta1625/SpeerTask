import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { InputValidation } from '../../../utils/base-validators'

class Auth{
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}

class AuthValidation extends InputValidation{
    constructor(){
        super(Auth)
    }
}

const authValidation=new AuthValidation()

export default authValidation
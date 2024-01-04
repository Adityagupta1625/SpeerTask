import { userCRUD } from "../crud"
import { Request,Response } from "express"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

class AuthController{

    public async signUp(req: Request,res: Response){
        try{

            const email: string=req.body?.email;
            const password: string=req.body?.password;

            const hashedPassword=bcrypt.hashSync(password,10)

            const existingUser=await userCRUD.getUserByEmail(email)

            if(existingUser){
                return res.status(400).json({message: "user already exists!!"})
            }
            
            const user=await userCRUD.addData({email: email,password: hashedPassword})

            const token=jwt.sign({id: user._id},process.env.SECRET ?? "")

            return res.status(201).json({token: token})

        }
        catch(e){
            console.log(e)
            return res.status(500).json({message: e?.message ?? "Internal Server Error"})
        }
    }

    public async login(req: Request,res: Response){
        try{

            const email: string=req.body?.email;
            const password: string=req.body?.password;

            const user=await userCRUD.getUserByEmail(email)

            if(!user){
                return res.status(404).json({message: "User does not Exist!!"})
            }

            if(!bcrypt.compareSync(password,user.password)){
                return res.status(403).json({message: "Enter Correct Password!!"})
            }

            const token=jwt.sign({id: user._id},process.env.SECRET ?? "")

            return res.status(200).json({token: token})

        }
        catch(e){
            return res.status(500).json({message: e?.message ?? "Internal Server Error"})
        }
    }
}

const authController=new AuthController()

export default authController
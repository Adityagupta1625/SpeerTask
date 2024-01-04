import { type Request, type Response, type NextFunction } from 'express'
import { validateOrReject } from 'class-validator'
import { plainToInstance } from 'class-transformer'


export abstract class InputValidation {
 
  validatorObj: any

  constructor (validatorObj: any) {
    this.validatorObj = validatorObj
  }

 
  public async validateInput (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | any> {
    try {
      
      const dtoInstance = plainToInstance(this.validatorObj, req.body)

      await validateOrReject(dtoInstance)

      next()
    } catch (e: any) {
      return res.status(400).json({ message: 'Invalid Data' })
    }
  }
}

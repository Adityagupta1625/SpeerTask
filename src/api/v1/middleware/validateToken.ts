import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { userCRUD } from '../crud'
import { UserSchema } from '../types'

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers?.authorization

    if (token === null || token === undefined) {
      res.status(403).json({ message: 'Token not found' })
      return
    }

    jwt.verify(
      token.split(' ')[1],
      process.env.SECRET as string,
      (err, decoded: any) => {
        if (err !== null) {
          res.status(403).json({ message: 'Invalid Token' })
        } else {
        
          const id: string = decoded?.id
          const user: Promise<UserSchema|null> = userCRUD.findbyId(id)

          user
            .then((result: UserSchema|null) => {
              if (result !== null || result !== undefined) {
                req.query.userId = decoded.id
                next()
              } else {
                res.status(403).json({ message: 'Invalid Token' })
              }
            })
            .catch((e) => {
              res.status(500).json({ message: e ?? 'Something went wrong' })
            })
        }
      }
    )
  } catch (e) {
    res.status(500).json({ message: e?.message ?? 'Something went wrong' })
  }
}
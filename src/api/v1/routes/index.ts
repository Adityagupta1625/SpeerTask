import { Router } from 'express'
import authRouter from './auth'
import notesRouter from './notes'
import searchRouter from './search'
import { validateToken } from '../middleware/validateToken'
import swaggerUI from 'swagger-ui-express'
import config from '../../../config/docs'

const apiRouter = Router()
apiRouter.use('/docs', swaggerUI.serve, swaggerUI.setup(config))
apiRouter.use('/auth',authRouter)
apiRouter.use('/notes',validateToken,notesRouter)
apiRouter.use('/search',validateToken,searchRouter)

export default apiRouter

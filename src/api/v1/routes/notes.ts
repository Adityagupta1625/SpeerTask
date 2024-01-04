import { Router } from "express";
import { notesValidation } from "../validators";
import { notesController } from "../controllers";
import { getRequestLimiter } from "../../../utils/rate-limiter";

const notesRouter=Router()

notesRouter.use(getRequestLimiter(5*60*1000,50))

notesRouter.post('/',notesValidation.validateInput.bind(notesValidation),notesController.addController.bind(notesController))

notesRouter.get('/',notesController.getAllController.bind(notesController))

notesRouter.get('/:id',notesController.getByIdController.bind(notesController))

notesRouter.delete('/:id',notesController.deleteController.bind(notesController))

notesRouter.put('/:id',notesValidation.validateInput.bind(notesValidation),notesController.updateController.bind(notesController))

notesRouter.post('/:id/share',notesController.getByIdController.bind(notesController))

export default notesRouter
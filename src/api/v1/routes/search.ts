import { Router } from "express";
import { searchController } from "../controllers";
import { validateToken } from "../middleware/validateToken";
import { getRequestLimiter } from "../../../utils/rate-limiter";

const searchRouter=Router()

searchRouter.use(getRequestLimiter(5*60*1000,100))

searchRouter.get('/',validateToken,searchController.querySearchController.bind(searchController))

export default searchRouter
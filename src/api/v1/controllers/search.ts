import { notesCRUD } from "../crud";
import {Request,Response} from 'express'

class SearchController{
    
    public async querySearchController(req: Request,res: Response){
        try{
            if(req.query?.q===null || req.query?.q===''){
                return res.status(400).json({message: "Search Query not found!!"})
            }

            const notes=await notesCRUD.findNotes(req.query.q as string)
            return res.status(200).json(notes) 
        }
        catch(e){
            console.log(e)
            return res.status(500).json({message: e?.message ?? "Internal Server Error"})
        }
    }
}

const searchController=new SearchController()

export default searchController
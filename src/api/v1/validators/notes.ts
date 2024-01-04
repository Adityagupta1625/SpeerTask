import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { InputValidation } from '../../../utils/base-validators'

class Notes{
    @IsString()
    @IsNotEmpty()
    note: string
}

class NotesValidation extends InputValidation{
    constructor(){
        super(Notes)
    }
}

const notesValidation=new NotesValidation()

export default notesValidation
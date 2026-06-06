import { IsNotEmpty, IsString } from "class-validator";

export class UpdateSideDishDto{
    @IsString()
    @IsNotEmpty()
    tenMonAnKem?: string
}
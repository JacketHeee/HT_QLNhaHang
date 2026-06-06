import { IsString } from "class-validator";

export class UpdateTableDto {
    @IsString()
    name: string;
}
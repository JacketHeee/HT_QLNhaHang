import { IsString } from "class-validator";

export class CreateTableDto {
    @IsString()
    name: string;
}
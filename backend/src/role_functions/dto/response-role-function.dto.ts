import { Role } from "src/roles/entities/role.entity";
import { Function } from "src/functions/entities/function.entity";

export class RoleFunctionResponseDto {
    ID: number;
    function?: Function;
    role?: Role;
}
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFeatureRoleDto {
  @IsNotEmpty()
  @IsNumber()
  roleId: number;

  @IsNotEmpty()
  @IsNumber()
  featureId: number;
} 
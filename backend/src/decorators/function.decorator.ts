import { SetMetadata } from '@nestjs/common';

export const RequireFunction = (functionName: string) => SetMetadata('function', functionName); 
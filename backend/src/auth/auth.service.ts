// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { AccountsService } from '../accounts/accounts.service';
// import { Account } from '../accounts/entities/account.entity';

// @Injectable()
// export class AuthService {
//   constructor(
//     private accountsService: AccountsService,
//     private jwtService: JwtService,
//   ) {}

//   async validateUser(username: string, password: string): Promise<any> {
//     try {
//       const user = await this.accountsService.validateAccount(username, password);
//       if (user) {
//         const { password, ...result } = user;
//         return result;
//       }
//       return null;
//     } catch (error) {
//       return null;
//     }
//   }

//   async login(user: Account) {
//     const payload = {
//       username: user.username,
//       sub: user.id,
//       role: user.role?.name
//     };
//     return {
//       access_token: this.jwtService.sign(payload),
//       user: {
//         id: user.id,
//         username: user.username,
//         role: user.role?.name,
//         employee: user.employee,
//       },
//     };
//   }
// } 
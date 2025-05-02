import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private accountsService: AccountsService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.accountsService.findByUsername(username);
        
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.passWord);
        
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        
        const { passWord, ...result } = user;
        return result;
    }

    async login(user: any) {
        const payload = { 
            username: user.userName, 
            sub: user.ID,
            roleId: user.IDQuyen,
            employeeId: user.IDNhanVien 
        };
        
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.ID,
                username: user.userName,
                roleId: user.IDQuyen,
                employeeId: user.IDNhanVien,
            }
        };
    }
} 
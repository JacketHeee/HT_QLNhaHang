import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        try {
            const user = await this.authService.validateUser(
                loginDto.username,
                loginDto.password,
            );
            return this.authService.login(user);
        } catch (error) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
} 
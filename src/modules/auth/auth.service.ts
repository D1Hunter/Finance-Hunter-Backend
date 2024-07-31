import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository) { }
    
    async register(dto: RegisterUserDto) {
        const user = await this.userRepository.findOneByEmail(dto.email);
        if (user) {
            throw new HttpException('This email is already in use.', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(dto.password, 6);
        const newUser = await this.userRepository.create({ ...dto, password: hashPassword });
        return newUser;
    }

    async login(dto: LoginUserDto) {
        const user = await this.userRepository.findOneByEmail(dto.email);
        if (!user) {
            throw new HttpException('Incorrect data input.', HttpStatus.BAD_REQUEST);
        }
        const comparePassword = await bcrypt.compare(dto.password, user.password);
        if (!comparePassword) {
            throw new HttpException('Incorrect data input.', HttpStatus.BAD_REQUEST);
        }
        return user;
    }
}

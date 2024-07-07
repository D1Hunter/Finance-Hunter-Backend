import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    create(dto: CreateUserDto): Promise<User> {
        return this.userRepository.create(dto);
    }
}

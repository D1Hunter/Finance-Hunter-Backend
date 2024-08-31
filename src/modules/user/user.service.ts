import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  getAll(limit: number, offset: number): Promise<User[]> {
    return this.userRepository.findMany({limit,offset});
  }

  getOneByEmail(email:string): Promise<User>{
    const user = this.userRepository.findOneByEmail(email);
    if(!user){
      throw new NotFoundException('User with this email is not exist');
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOneByEmail(dto.email);
    if (user) {
      throw new NotFoundException('User with this email already exist');
    }
    return this.userRepository.create({ ...dto });
  }

  delete(id: string) {
    return this.userRepository.delete(id);
  }
}
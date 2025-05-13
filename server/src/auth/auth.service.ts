import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { Request } from 'express';
import { Lawyer } from 'src/lawyers/entities/lawyer.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...result } = user;
    return result;
  }

  login(user: any /* could type as a union if you like */) {
    // build the common parts of the JWT payload:
    const base = { email: user.email, sub: user.id };

    // decide whether this is a lawyer vs. a regular user/admin:
    const isLawyer = 'barNumber' in user; // any unique lawyer field works

    // build the rest of the payload:
    const payload = isLawyer
      ? {
          ...base,
          role: 'lawyer',
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          legalExperience: user.legalExperience,
          education: user.education,
          barNumber: user.barNumber,
          visaSpecialties: user.visaSpecialties,
          yearsOfExperience: user.yearsOfExperience,
          lawFirm: user.lawFirm,
        }
      : {
          ...base,
          role: user.role, // e.g. 'admin' or 'user'
          firstName: user.firstName,
          lastName: user.lastName,
        };

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
    return { access_token };
  }

  async register(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const existingUser = await this.usersService.findOneByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
      id: 0,
    });

    const { password: _, ...result } = newUser;
    return result;
  }

  async getLoggedUser(req: Request) {
    const token = req.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedException('No authentication token found');
    }

    const decoded = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    if (!decoded) {
      throw new UnauthorizedException('Invalid token');
    }

    return decoded;
  }
}

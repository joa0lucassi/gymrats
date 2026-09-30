import { ConflictException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) { }

    async register(dto: RegisterDto) {
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: dto.email.toLowerCase() },
                    {
                        profile: {
                            username: dto.username,
                        },
                    },
                ],
            },
        });

        if (existingUser) {
            throw new ConflictException('Email or username already in use');
        }

        const passwordHash = await argon2.hash(dto.password);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email.toLowerCase(),
                passwordHash,

                profile: {
                    create: {
                        username: dto.username,
                    },
                },
            },

            select: {
                id: true,
                email: true,
                createdAt: true,

                profile: {
                    select: {
                        username: true,
                        currentLevel: true,
                        totalXp: true,
                    },
                },
            },
        });

        return user;
    }
}
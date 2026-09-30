import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                createdAt: true,
                profile: {
                    select: {
                        username: true,
                        trainingExperience: true,
                        currentLevel: true,
                        totalXp: true,
                    },
                },
            },
        });
    }
    async findById(id: string) {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                email: true,
                createdAt: true,
                profile: {
                    select: {
                        username: true,
                        bio: true,
                        profileImage: true,
                        trainingExperience: true,
                        currentLevel: true,
                        totalXp: true,
                    },
                },
            },
        });
    }
}
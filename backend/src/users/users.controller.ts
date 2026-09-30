import {
    Controller,
    Get,
    Req,
    UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';

import { AuthGuard } from '../auth/auth.guard.js';
import { UsersService } from './users.service.js';

type AuthenticatedRequest = Request & {
    user: {
        sub: string;
    };
};

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('me')
    findMe(@Req() request: AuthenticatedRequest) {
        return this.usersService.findById(request.user.sub);
    }
}
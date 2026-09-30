import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

type AuthenticatedRequest = Request & {
    user?: {
        sub: string;
    };
};

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request =
            context.switchToHttp().getRequest<AuthenticatedRequest>();

        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        if (type !== 'Bearer' || !token) {
            throw new UnauthorizedException('Authentication required');
        }

        try {
            const payload = await this.jwtService.verifyAsync<{ sub: string }>(
                token,
            );

            request.user = payload;

            return true;
        } catch {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        console.log("verifying authentication...")
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;
        console.log("Token --->", token)
        if (token) {
            return true;
        }
        else {
            throw new HttpException(
                'Bearer token is not supplied.',
                HttpStatus.UNAUTHORIZED
            );
            return false;
        }
    }
}

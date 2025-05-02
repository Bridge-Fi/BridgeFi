import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('AdminGuard: Checking role...');
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new ForbiddenException('User not authenticated');
    }

    console.log('AdminGuard: User role:', request.user.role);

    if (request.user.role === 'admin') {
      return true;
    }

    throw new ForbiddenException('Admin privileges required');
  }
}

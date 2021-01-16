import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '@/routes/users';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return <User>request.user;
  },
);

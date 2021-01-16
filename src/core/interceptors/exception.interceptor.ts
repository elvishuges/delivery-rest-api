import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((err: HttpException) =>
          throwError(new HttpException(err.message, HttpStatus.BAD_GATEWAY)),
        ),
      );
  }
}

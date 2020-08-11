import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import { Request } from 'express';
import { getMockData } from '../_mock/_mockData';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest();

    const accessToken = request.header('Access-Token');
    if (!accessToken || accessToken !== getMockData().backEndToken) {
      return false;
    }

    return true;
  }
}

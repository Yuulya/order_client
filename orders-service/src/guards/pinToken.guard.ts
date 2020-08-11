import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import { Request } from 'express';
import { getMockData } from '../_mock/_mockData';

@Injectable()
export class PinTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest();

    const pinToken = request.header('pinToken');
    if (!pinToken || pinToken !== getMockData().pinToken) {
      return false;
    }

    return true;
  }
}

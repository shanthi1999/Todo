import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class ResponseService {
  sendResponse(
    res: Response,
    statusCode: number,
    data: any,
    successMessage: string,
  ): void {
    res.status(statusCode).json({
      status: 'success',
      message: successMessage,
      data: data,
    });
  }
}

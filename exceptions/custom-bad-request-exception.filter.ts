import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { Error } from 'mongoose';
import ValidationError = Error.ValidationError;

@Catch(ValidationError)
export class CustomBadRequest implements RpcExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp(),
      response = ctx.getResponse();

    return response.status(409).json({
      statusCode: 409,
      createdBy: 'ValidationErrorFilter',
      errors: exception.errors,
    });
  }
}

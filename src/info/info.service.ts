import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateInfoRequest as UpdateInfoRequestInterface } from './interfaces';
import { BaseResponse } from '../interfaces';
import { UpdateInfoRequest } from './models';
import { FormValues } from './classes/FormValues';

@Injectable()
export class InfoService {
  async validateInfo(
    rawData: UpdateInfoRequestInterface,
  ): Promise<BaseResponse> {
    const data = plainToClass(UpdateInfoRequest, rawData);
    const validationErrors = await validate(data);
    if (validationErrors.length > 0) {
      return {
        success: false,
        errors: validationErrors,
      };
    }
    return {
      success: true,
      data,
    };
  }

  async validateFormData(
    formValues: Record<string, any>,
  ): Promise<BaseResponse> {
    const formValueClass = plainToClass(FormValues, formValues);
    const validationErrors = await validate(formValueClass, {
      stopAtFirstError: true,
    });
    if (validationErrors.length > 0) {
      return {
        success: false,
        errors: validationErrors,
      };
    }
    return {
      success: true,
      data: validationErrors,
    };
  }
}

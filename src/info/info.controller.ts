import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { InfoService } from './info.service';
import { UpdateInfoRequest } from './interfaces';
import { BaseResponse } from '../interfaces';
import { FormValues } from './classes/FormValues';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post('/validate')
  getConfig(@Body() bodyRequest: UpdateInfoRequest): Promise<BaseResponse> {
    return this.infoService.validateInfo(bodyRequest);
  }

  @Post('/validate-form')
  validateForm(@Body() formValues: FormValues): Promise<BaseResponse> {
    console.log(formValues);
    this.infoService.validateFormData(formValues);
    throw new HttpException('Not implemented', 422);
  }
}

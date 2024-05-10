import { Controller, Post, Body } from '@nestjs/common';
import { InfoService } from './info.service';
import { UpdateInfoRequest } from './interfaces';
import { BaseResponse } from '../interfaces';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post('/validate')
  getConfig(@Body() bodyRequest: UpdateInfoRequest): Promise<BaseResponse> {
    return this.infoService.validateInfo(bodyRequest);
  }

  @Post('/validate-form')
  validateForm(): Promise<BaseResponse> {
    return Promise.resolve({
      success: true,
      data: 'Form is valid!',
    });
  }
}

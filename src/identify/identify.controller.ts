import { Controller, Get, HttpCode, Post, UseGuards, Put } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiBadRequestResponse,
    ApiTags,
    ApiParam,
    ApiQuery,
} from '@nestjs/swagger';
import { IdentifyService } from './identify.service';
@ApiTags('Identify')


@Controller({ path: '/identify', version: '1' })
export class IdentifyController {
    constructor(private identifyService: IdentifyService) { }

    @HttpCode(200)
    @ApiOkResponse({ type: String })
    @ApiBadRequestResponse({ type: String })
    @Post('/')
    async getContact() {
        return await this.identifyService.getContact();
    }
}
import { Controller, Get, HttpCode, Post, UseGuards, Put, Body } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiBadRequestResponse,
    ApiTags,
    ApiParam,
    ApiQuery,
} from '@nestjs/swagger';
import { IdentifyService } from './identify.service';
import { IdentifyDto } from './dto/identify-contact.dto';
@ApiTags('Identify')
@Controller({ path: '/identify', version: '1' })
export class IdentifyController {
    constructor(private identifyService: IdentifyService) { }

    @HttpCode(200)
    @ApiOkResponse({ type: String })
    @ApiBadRequestResponse({ type: String })
    @Post('/')
    async getContact(@Body() data: IdentifyDto) {
        return await this.identifyService.getContact(data);
    }
}
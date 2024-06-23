import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsOptional } from 'class-validator';

export class IdentifyDto {
    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty()
    @IsPhoneNumber('IN')
    @IsOptional()
    phoneNumber: string;
}

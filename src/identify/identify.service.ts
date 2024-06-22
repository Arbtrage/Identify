import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class IdentifyService {
    constructor(private prisma: PrismaService) { }

    async getContact() {
        return "Success";
    } 
}
import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IdentifyService } from './identify.service';
import { IdentifyController } from './identify.controller';
import { AppModule } from 'src/app.module';

@Module({
    controllers: [IdentifyController],
    providers: [IdentifyService],
    imports: [forwardRef(() => AppModule), PrismaModule],
})


export class IdentifyModule { }

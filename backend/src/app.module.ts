import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './modules/ai/ai.module';
import { AuthModule } from './modules/auth/auth.module';
import { MindmapsModule } from './modules/mindmaps/mindmaps.module';
import { NodesModule } from './modules/nodes/nodes.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    MindmapsModule,
    NodesModule,
    AiModule,
  ],
})
export class AppModule {}

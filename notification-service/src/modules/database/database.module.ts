import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const uri = cfg.get<string>('DATABASE_URL');
        console.log('🔌 Connecting MongoDB at:', uri);
        return { uri };
      },
    }),
  ],
})
export class DatabaseModule {}

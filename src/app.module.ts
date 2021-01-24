// Nest modules
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// App modules
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
import { RoutesModule } from './routes/routes.module';

// Load configs
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    // Nest
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
    }),
    // App
    CoreModule,
    DatabaseModule,
    RoutesModule,
  ],
})
export class AppModule { }

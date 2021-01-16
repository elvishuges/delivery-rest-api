// Nesj modules
import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';

// App modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

// App routes
const routes: Routes = [
  { path: '/auth', module: AuthModule },
  {
    path: '/api',
    children: [
      {
        path: '/users',
        module: UsersModule,
      },
    ],
  },
];

@Module({
  imports: [
    // App modules
    AuthModule,
    UsersModule,
    // Router module
    RouterModule.forRoutes(routes),
  ],
})
export class RoutesModule {}

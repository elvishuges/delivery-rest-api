// Nesj modules
import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';

// App modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ShoppingCartsModule } from './shopping-carts/shopping-carts.module';
import { ProductsModule } from './products/products.module';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { Product } from './products/entities/product.entity';

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
      {
        path: '/shoppingCarts',
        module: ShoppingCartsModule,
      },
      {
        path: '/categories',
        module: CategoriesModule,
      },
      {
        path: '/products',
        module: ProductsModule,
      },
    ],
  },
];

@Module({
  imports: [
    // App modules
    AuthModule,
    UsersModule,
    ShoppingCartsModule,
    // Router module
    RouterModule.forRoutes(routes),
    ProductsModule,
    CategoriesModule,
  ],
  controllers: [CategoriesController],
})
export class RoutesModule { }

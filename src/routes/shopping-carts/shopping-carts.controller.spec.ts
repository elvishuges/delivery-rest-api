import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartsController } from './shopping-carts.controller';

describe('ShoppingCartsController', () => {
  let controller: ShoppingCartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingCartsController],
    }).compile();

    controller = module.get<ShoppingCartsController>(ShoppingCartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

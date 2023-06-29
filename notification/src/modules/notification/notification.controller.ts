import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('notification')
export class NotificationController {
  @EventPattern('create product')
  productCreated() {
    console.log('proudct created');
  }
  @EventPattern('delete product')
  productDeleted() {
    console.log('product deleted');
  }

  @EventPattern('update product')
  productUpdated() {
    console.log('product updated');
  }
}

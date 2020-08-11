import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateOrderDto {
  @ApiModelProperty({
    type: Object,
    description: 'Order Details',
  })
  details: any;
}

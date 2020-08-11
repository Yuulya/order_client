import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class ProcessOrderDto {
  @ApiModelProperty({
    type: Object,
    description: 'Order Details',
  })
  data: any;
}

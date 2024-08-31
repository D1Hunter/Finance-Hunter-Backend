import { IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'The name must be a string' })
  @Length(5, 30, {
    message: 'The name can contain: 5 min and 30 max characters.',
  })
  readonly name: string;
}

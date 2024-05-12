import {
  IsDateString,
  IsNotEmpty,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class FormValues {
  @IsNotEmpty({
    message: 'The name is required',
  })
  @MinLength(10, {
    message: 'The name is too short',
  })
  @MaxLength(50, {
    message: 'The name is too long',
  })
  name: string;

  @IsNotEmpty({
    message: 'The age is required',
  })
  @Min(1)
  @Max(150)
  age: number;

  @ValidateIf((o) => o.age < 18 || o.married != null, {
    message: 'The married field is required for people above 18 years old',
  })
  married: boolean;

  @IsNotEmpty({
    message: 'The date of birth is required',
  })
  @IsDateString('The date format is not correct')
  @ValidateIf((o) => getYearsDifference(new Date(o.dateOfBirth)) == o.age, {
    message: 'The date of birth is not compatible with the age',
  })
  dateOfBirth: string;
}

function getYearsDifference(date) {
  const now = new Date();
  let diff = now.getFullYear() - date.getFullYear();
  if (
    now.getMonth() < date.getMonth() ||
    (now.getMonth() == date.getMonth() && now.getDate() < date.getDate())
  ) {
    diff--;
  }
  return diff;
}

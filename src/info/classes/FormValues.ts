import {
  IsDateString,
  IsNotEmpty,
  Max,
  MaxLength,
  Min,
  MinLength,
  Validate,
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

  @Validate((o) => o.age < 18 || o.married != null, {
    message: 'The married field is required for people above 18 years old',
  })
  married: boolean;

  @Validate((o) => getYearsDifference(new Date(o.dateOfBirth)) == o.age, {
    message: 'The date of birth is not compatible with the age',
  })
  @IsNotEmpty({
    message: 'The date of birth is required',
  })
  @IsDateString({}, { message: 'The date format is not correct' })
  dateOfBirth: string;

  constructor(
    name: string,
    age: number,
    married: boolean,
    dateOfBirth: string,
  ) {
    this.name = name;
    this.age = age;
    this.married = married;
    this.dateOfBirth = dateOfBirth;
  }
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

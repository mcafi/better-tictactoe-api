import {
  IsDateString,
  IsNotEmpty,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
} from 'class-validator';

@ValidatorConstraint({ name: 'isMarriedForAdults', async: false })
export class IsMarriedForAdults implements ValidatorConstraintInterface {
  validate(married: any, args: ValidationArguments) {
    const age = (args.object as any).age;
    console.log(age, married);
    return age < 18 || married != null;
  }

  defaultMessage() {
    return 'The married field is required for people above 18 years old';
  }
}

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

  @Validate(IsMarriedForAdults)
  married: boolean;

  @ValidateIf((o) => getYearsDifference(new Date(o.dateOfBirth)) == o.age, {
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

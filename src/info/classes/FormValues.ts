import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  Max,
  MaxLength,
  Min,
  MinLength,
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
    return age < 18 || married != null;
  }

  defaultMessage() {
    return 'This value is required for people above 18 years old';
  }
}

@ValidatorConstraint({ name: 'isDateOfBirthValid', async: false })
export class IsDateOfBirthValid implements ValidatorConstraintInterface {
  validate(dateOfBirth: any, args: ValidationArguments) {
    const age = (args.object as any).age;
    const date = new Date(dateOfBirth);
    const now = new Date();
    let diff = now.getFullYear() - date.getFullYear();
    if (
      now.getMonth() < date.getMonth() ||
      (now.getMonth() == date.getMonth() && now.getDate() < date.getDate())
    ) {
      diff--;
    }
    return diff == age;
  }

  defaultMessage() {
    return 'The date of birth is not compatible with the age provided';
  }
}

export class FormValues {
  @MinLength(10, {
    message: 'The name length must be between 10 and 50 characters',
  })
  @MaxLength(50, {
    message: 'The name length must be between 10 and 50 characters',
  })
  @IsNotEmpty({
    message: 'The name is required',
  })
  name: string;

  @Min(1, { message: 'The age must be between 1 and 150 years' })
  @Max(150, { message: 'The age must be between 1 and 150 years' })
  @IsNumber()
  @IsNotEmpty({
    message: 'The age is required',
  })
  age: number;

  @Validate(IsMarriedForAdults)
  married: boolean;

  @Validate(IsDateOfBirthValid)
  @IsDateString(
    {},
    {
      message:
        'The date format is not correct. The expected format is ISO-8601 (YYYY-MM-DD)',
    },
  )
  @IsNotEmpty({
    message: 'The date of birth is required',
  })
  dateOfBirth: string;
}

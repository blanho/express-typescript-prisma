import { object, string, TypeOf, z } from 'zod';

enum RoleEnumType {
  ADMIN = 'admin',
  USER = 'user',
}

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'First name is required',
    }),
    lastName: string({
      required_error: 'Last name is required',
    }),
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    password: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string({
      required_error: 'Please confirm your password',
    }),
    role: z.optional(z.nativeEnum(RoleEnumType)),
  }).refine(data => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Invalid email or password'),
  }),
});

export const verifyEmailSchema = object({
  body: object({
    token: string({
      required_error: 'verificationCode is required'
    }),
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
  }),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>['body'], 'passwordConfirm'>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>['body'];

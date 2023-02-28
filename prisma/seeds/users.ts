import bcrypt from 'bcryptjs';
import { RoleEnumType } from '@prisma/client';

const users = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456789', 10),
    verified: true,
    role: RoleEnumType.admin,
    verificationDate: new Date(Date.now())
  },
  {
    id: 2,
    firstName: 'Ana',
    lastName: 'Loe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456789', 10),
    verified: true,
    role: RoleEnumType.user,
    verificationDate: new Date(Date.now())
  },
  {
    id: 3,
    firstName: 'Ana',
    lastName: 'Claria',
    email: 'Jane@example.com',
    password: bcrypt.hashSync('123456789', 10),
    verified: true,
    role: RoleEnumType.user,
    verificationDate: new Date(Date.now())
  },
];

export default users;

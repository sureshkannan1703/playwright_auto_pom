import {env} from '../config/env';

export const users = {
  validUser: {
    username: env.userName,
    password: env.password
  },
  
  invalidUser: {
    username: 'InvalidUser',
    password: 'InvalidPassword',
  },
};
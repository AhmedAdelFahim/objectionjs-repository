import { Knex } from 'knex';

import { IUser } from './user.interface';
import User from './user.model';
import { BaseRepository } from '../../../../lib/base-repository';

export class UserRepository extends BaseRepository<IUser> {
  constructor(knexInstance: Knex) {
    super(User, knexInstance);
  }
}

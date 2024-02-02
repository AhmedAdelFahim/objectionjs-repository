# ObjectionJS Repository
ObjectionJS Repository is repository pattern implementation on top of [KnexJS](https://www.npmjs.com/package/knex) and [ObjectionJS](https://www.npmjs.com/package/objection)

## Installation
```bash
$ npm i objectionjs-repository
```

## Usage
```bash
// Define Interface
export interface IUser {
  id: number;
  age: number;
  name: string;
}

// Define Model
export default class User extends Model {
  static get tableName() {
    return TABLES.USER;
  }
}

// Define Repository
import { BaseRepository } from 'objectionjs-repository';

export class UserRepository extends BaseRepository<IUser> {
  constructor(knexInstance: Knex) {
    super(User, knexInstance);
  }
}

```
then you can use defined repository

```bash
   const userRepo = new UserRepository(knexInstance);
   const user = await userRepo.getOne({ age: 25 })
```
## API
#### getOne(conditions, [options])
#### getAll(conditions, [options])
#### create(data, [options])
#### createMany(data, [options])
#### update(conditions, data, [options])
#### delete(conditions, [options])
## Support
Feel free to open issues on [github](https://github.com/AhmedAdelFahim/objectionjs-repository).
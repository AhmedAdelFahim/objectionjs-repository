# ObjectionJS Repository

ObjectionJS Repository is repository pattern implementation on top of [KnexJS](https://www.npmjs.com/package/knex) and [ObjectionJS](https://www.npmjs.com/package/objection)

[![Latest Stable Version](https://img.shields.io/npm/v/objectionjs-repository.svg?style=for-the-badge)](https://www.npmjs.com/package/objectionjs-repository)
[![License](https://img.shields.io/npm/l/objectionjs-repository.svg?style=for-the-badge)](https://www.npmjs.com/package/objectionjs-repository)
[![NPM Downloads](https://img.shields.io/npm/dt/objectionjs-repository.svg?style=for-the-badge)](https://www.npmjs.com/package/objectionjs-repository)
[![NPM Downloads](https://img.shields.io/npm/dm/objectionjs-repository.svg?style=for-the-badge)](https://www.npmjs.com/package/objectionjs-repository)
## Content

1. [Installation](https://www.npmjs.com/package/objectionjs-repository#installation)
1. [Usage](https://www.npmjs.com/package/objectionjs-repository#usage)
1. [API](https://www.npmjs.com/package/objectionjs-repository#api)
    1. [getOne](https://www.npmjs.com/package/objectionjs-repository#getoneconditions-options)
    1. [getAll](https://www.npmjs.com/package/objectionjs-repository#getallconditions-options)
    1. [create](https://www.npmjs.com/package/objectionjs-repository#createdata-options)
    1. [createMany](https://www.npmjs.com/package/objectionjs-repository#createmanydata-options)
    1. [update](https://www.npmjs.com/package/objectionjs-repository#updateconditions-data-options)
    1. [delete](https://www.npmjs.com/package/objectionjs-repository#deleteconditions-options)
1. [Options](https://www.npmjs.com/package/objectionjs-repository#options)
1. [Tests](https://www.npmjs.com/package/objectionjs-repository#tests)
1. [Support](https://www.npmjs.com/package/objectionjs-repository#support)

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
conditions is object contains any column in this table.</br>
options is **IFindingOptions**.</br>
return selected row or undefined
#### getAll(conditions, [options])
conditions is object contains any column in this table.</br>
options is **IFindingOptions**.</br>
return selected rows or empty array.

#### create(data, [options])
data to be inserted.</br>
options is **ICreationOptions**.

#### createMany(data, [options])
array to be inserted.</br>
options is **ICreationOptions**.

#### update(conditions, data, [options])
conditions is object contains any column in this table.</br>
data to be updated.</br>
options is **IUpdatingOptions**.

#### delete(conditions, [options])
conditions is object contains any column in this table. </br>
options is **IDeletionOptions**.

## Options

#### IFindingOptions

```bash
IFindingOptions {
  // database Transaction
  trx?: Knex.Transaction;
  // lock selected rows or not
  forUpdate?: boolean;
  // select where column not in array
  whereNotIn?: {
    field: string;
    values: any;
  }[];
  // select where column in array
  whereIn?: {
    field: string;
    values: any;
  }[];
  // select where columns is null
  whereNull?: string[];
  // select where columns is not null
  whereNotNull?: string[];
}
```

#### ICreationOptions
```bash
ICreationOptions {
  // database Transaction
  trx?: Knex.Transaction;
}
```

#### IUpdatingOptions
```bash
IUpdatingOptions {
  // database Transaction
  trx?: Knex.Transaction;
  // select where column not in array
  whereNotIn?: {
    field: string;
    values: any;
  }[];
  // select where column in array
  whereIn?: {
    field: string;
    values: any;
  }[];

  // select where columns is null
  whereNull?: string[];
  // select where columns is not null
  whereNotNull?: string[];
}
```

#### IDeletionOptions
```bash
IDeletionOptions {
  // database Transaction
  trx?: Knex.Transaction;
  // select where column not in array
  whereNotIn?: {
    field: string;
    values: any;
  }[];
  // select where column in array
  whereIn?: {
    field: string;
    values: any;
  }[];
  // select where columns is null
  whereNull?: string[];
  // select where columns is not null
  whereNotNull?: string[];
}
```

## Tests

To run the test suite, first install the dependencies and rename .env.sample to .env and set connection url for postgres database in .env then run `npm test`:

```bash
$ npm install
$ npm test
```

## Support

Feel free to open issues on [github](https://github.com/AhmedAdelFahim/objectionjs-repository).

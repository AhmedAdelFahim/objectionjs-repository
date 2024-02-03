import { Knex } from 'knex';
export interface ICreationOptions {
  // database Transaction
  trx?: Knex.Transaction;
}

export interface IUpdatingOptions {
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
}

export interface IDeletionOptions {
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
}

/* eslint-disable no-unused-vars */
export interface IDataWriter<T> {
  create(data: Omit<Partial<T>, 'id'>, options: ICreationOptions): Promise<T>;
  createMany(data: Omit<Partial<T>, 'id'>[], options: ICreationOptions): Promise<T[]>;
  delete(conditions: Partial<T>, options: IDeletionOptions): Promise<number>;
  update(conditions: Partial<T>, data: Partial<T>, options: IUpdatingOptions): Promise<number>;
}

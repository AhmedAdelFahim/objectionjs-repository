import { Knex } from 'knex';
export interface ICreationOptions {
  trx?: Knex.Transaction;
}

export interface IUpdatingOptions {
  trx?: Knex.Transaction;
  whereNotIn?: {
    field: string;
    values: any;
  }[];
  whereIn?: {
    field: string;
    values: any;
  }[];
}

export interface IDeletionOptions {
  trx?: Knex.Transaction;
  whereNotIn?: {
    field: string;
    values: any;
  }[];
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

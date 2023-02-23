import { Knex } from 'knex';

export interface IDataReader<T> {
  getOne(conditions: Partial<T>, options: IFindingOptions): Promise<T | undefined>;
  getAll(conditions: Partial<T>, options: IFindingOptions): Promise<T[]>;
}

export interface IFindingOptions {
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

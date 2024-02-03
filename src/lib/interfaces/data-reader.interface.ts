import { Knex } from 'knex';

export interface IDataReader<T> {
  getOne(conditions: Partial<T>, options: IFindingOptions): Promise<T | undefined>;
  getAll(conditions: Partial<T>, options: IFindingOptions): Promise<T[]>;
}

export interface IRelatedModelsOptions {
  [key: string]: any;
  trx?: Knex.Transaction;
  whereIn?: {
    field: string;
    values: any[];
  }[];
  whereNotIn?: {
    field: string;
    values: any;
  }[];
  relatedModels?: any;
}

export interface IFindingOptions {
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
}

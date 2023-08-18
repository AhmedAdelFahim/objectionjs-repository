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
  trx?: Knex.Transaction;
  forUpdate?: boolean;
  whereNotIn?: {
    field: string;
    values: any;
  }[];
  whereIn?: {
    field: string;
    values: any;
  }[];
}

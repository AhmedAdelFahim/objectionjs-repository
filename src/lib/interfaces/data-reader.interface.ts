import { IOptions } from './commen.interface';

export interface IDataReader<T> {
  getOne(conditions: Partial<T>, options: IFindingOptions): Promise<T | undefined>;
  getAll(conditions: Partial<T>, options: IFindingOptions): Promise<T[]>;
}

export interface IRelatedModelsOptions {
  [key: string]: any;
  trx?: any;
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

export interface IFindingOptions extends IOptions {
  // lock selected rows or not
  forUpdate?: boolean;

  // select specific columns
  select?: string[];
}

import { IOptions } from './commen.interface';
export interface ICreationOptions {
  // database Transaction
  trx?: any;
}

export type IUpdatingOptions = IOptions;

export type IDeletionOptions = IOptions;

/* eslint-disable no-unused-vars */
export interface IDataWriter<T> {
  create(data: Omit<Partial<T>, 'id'>, options: ICreationOptions): Promise<T>;
  createMany(data: Omit<Partial<T>, 'id'>[], options: ICreationOptions): Promise<T[]>;
  delete(conditions: Partial<T>, options: IDeletionOptions): Promise<number>;
  update(conditions: Partial<T>, data: Partial<T>, options: IUpdatingOptions): Promise<number>;
}

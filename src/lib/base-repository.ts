import { Knex } from 'knex';
import R from 'ramda';
import { IDataReader, IFindingOptions, IRelatedModelsOptions } from './interfaces/data-reader.interface';
import { ICreationOptions, IDataWriter, IDeletionOptions, IUpdatingOptions } from './interfaces/data-writer.interface';
import { IOptions } from './interfaces/commen.interface';

export abstract class BaseRepository<T> implements IDataReader<T>, IDataWriter<T> {
  // model is objection Model
  constructor(public readonly model: any, private knexInstance: Knex) {}

  private applyConditions(query: any, options: IOptions) {
    if (!R.isNil(options.whereIn)) {
      options.whereIn.forEach((condition: any) => {
        query = query.whereIn(condition.field, condition.values);
      });
    }
    if (!R.isNil(options.whereNull)) {
      options.whereNull.forEach((column: string) => {
        query = query.whereNull(column);
      });
    }
    if (!R.isNil(options.whereNotNull)) {
      options.whereNotNull.forEach((column: string) => {
        query = query.whereNotNull(column);
      });
    }
    if (!R.isNil(options.whereNotIn)) {
      options.whereNotIn.forEach((condition: any) => {
        query = query.whereNotIn(condition.field, condition.values);
      });
    }

    return query;
  }

  createMany(items: Omit<Partial<T>, 'id'>[], options: ICreationOptions = {}): Promise<T[]> {
    return this.model.query(options?.trx).insert(items).returning('*');
  }

  create(data: Omit<Partial<T>, 'id'>, options: ICreationOptions = {}): Promise<T> {
    return this.model.query(options?.trx).insert(data).returning('*');
  }

  delete(conditions: Partial<T>, options: IDeletionOptions = {}): Promise<number> {
    let query = this.model.query(options?.trx).delete();

    if (!R.isEmpty(conditions)) {
      query = query.where(conditions);
    }
    query = this.applyConditions(query, options);
    return query;
  }

  update(conditions: Partial<T>, data: Partial<T>, options: IUpdatingOptions = {}): Promise<number> {
    let query = this.model.query(options?.trx).patch(data).where(conditions);
    query = this.applyConditions(query, options);
    return query;
  }

  getOne(conditions: Partial<T>, options: IFindingOptions = {}): Promise<T | undefined> {
    let query = this.model.query(options?.trx).findOne(conditions);
    query = query.select(options?.select || '*');
    query = this.applyConditions(query, options);
    if (options.forUpdate) {
      query = query.forUpdate();
    }
    return query;
  }

  getAll(conditions: Partial<T>, options: IFindingOptions = {}): Promise<T[]> {
    let query = this.model.query(options?.trx).where(conditions);
    query = query.select(options?.select || '*');
    query = this.applyConditions(query, options);
    if (options.forUpdate) {
      query = query.forUpdate();
    }
    return query;
  }

  // Shortcut for Query Builder call
  qb(): Knex.QueryBuilder {
    return this.model.knex().table(this.model.tableName);
  }

  knex(): Knex {
    return this.model.knex();
  }

  async getWithRelatedModels(
    conditions: Partial<T>,
    options: IRelatedModelsOptions = { relatedModels: {} },
  ): Promise<T[]> {
    let query = this.model
      .query(options?.trx)
      .withGraphFetched({ ...options.relatedModels })
      .where(conditions);
    if (!R.isNil(options.whereIn)) {
      options.whereIn.forEach((condition: any) => {
        query = query.whereIn(condition.field, condition.values);
      });
    }
    if (!R.isNil(options.whereNotIn)) {
      options.whereNotIn.forEach((condition: any) => {
        query = query.whereNotIn(condition.field, condition.values);
      });
    }
    return query;
  }

  async getKnexInstance(): Promise<any> {
    return this.knexInstance;
  }
}

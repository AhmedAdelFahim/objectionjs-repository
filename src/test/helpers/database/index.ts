import Knex, { Knex as KnexType } from 'knex';
import R from 'ramda';
import { Model } from 'objection';
import { TABLES } from './table.constant';
import * as dotenv from 'dotenv';
import { users } from './data/users.json';

dotenv.config();
export class Database {
  private static _knexInstance: KnexType | null = null;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static async getInstance() {
    if (R.isNil(this._knexInstance)) {
      this._knexInstance = Knex({
        client: 'pg',
        connection: process.env.DB_URL,
      });
      Model.knex(this._knexInstance);
      return this._knexInstance;
    } else {
      return this._knexInstance;
    }
  }

  static async initSchema() {
    if (await (await this.getInstance())?.schema.hasTable(TABLES.USER)) {
      return;
    }

    await (
      await this.getInstance()
    )?.schema.createTable(TABLES.USER, (table: any) => {
      table.increments('id');
      table.string('name');
      table.integer('age');
    });
  }

  static async seed() {
    await (await this.getInstance())?.table(TABLES.USER)?.truncate();
    await (await this.getInstance())?.table(TABLES.USER)?.insert(users);
  }

  static async init() {
    await this.initSchema();
    await this.seed();
  }

  static async teardown() {
    await (await this.getInstance())?.destroy();
  }
}

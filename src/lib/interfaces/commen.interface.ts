export interface IOptions {
  // database Transaction
  trx?: any;
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

  // select where column is null
  whereNull?: string[];
  // select where column is not null
  whereNotNull?: string[];
}

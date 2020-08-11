import { Model, Document, SaveOptions, Query } from 'mongoose';

// base repo
export class BaseRepository<T extends Document> {
  private readonly isSoftDeleteSupported: boolean;

  // inject model
  constructor(public readonly model: Model<T>) {
  }

  async createCollectionIfNotExited(): Promise<void> {
    if (!(await this.isCollectionExists())) {
      await this.model.createCollection();
    }
  }

  // check
  private async isCollectionExists(): Promise<boolean> {
    const result = await this.model.db.db
      .listCollections({name: this.model.collection.collectionName})
      .next();
    return !!result;
  }


  create(doc, options?: SaveOptions): Promise<T>;

  create(docs, options?: SaveOptions): Promise<T[]>;

  async create(docs, options?: SaveOptions): Promise<T | T[]> {
    if (Array.isArray(docs)) {
      const result: T[] = [];
      for (const doc of docs) {
        result.push(await this.create(doc, options));
      }
      return result;
    }
    return this.save(new this.model(docs), options);
  }



  async save(doc: T, options?: SaveOptions): Promise<T>;
  async save(docs: T[], options?: SaveOptions): Promise<T[]>;
  async save(docs: T | T[], options?: SaveOptions): Promise<T | T[]> {
    if (Array.isArray(docs)) {
      const result: T[] = [];
      for (const doc of docs) {
        result.push(await this.save(doc, options));
      }
      return result;
    }
    return docs.save(options);
  }

  async findOne(conditions: any, options?): Promise<T> {
    return this.modifyQuery(this.model.findOne(conditions, null, options), options).exec();
  }

  private isNotIncludeSoftDeleted(options) {
    return this.isSoftDeleteSupported && (!options || !options.includeSoftDeleted);
  }

  private modifyQuery<U>(query: Query<U>, options?: any): Query<U> {
    if (this.isNotIncludeSoftDeleted(options)) {
      query = query.where('_deleted').ne(true);
    }
    return query;
  }

  async updateOne(conditions: any, doc: any, options?): Promise<T> {
    return this.modifyQuery(
      this.model.findOneAndUpdate(conditions, doc),
      options,
    ).exec();
  }

  async find(conditions: any, options?): Promise<T[]> {
    return this.modifyQuery(this.model.find(conditions, null, options), options).exec();
  }

  async findAll(options?): Promise<T[]> {
    return this.find({}, options);
  }
}

export class BaseDocument extends Document {
}

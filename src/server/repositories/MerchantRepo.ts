import { MerchantEntity } from '~/schemas/merchant/entities/merchantEntity';
import { db, DB } from '../db/db';

export interface IBaseRepository<Entity> {
  create: (data: Omit<Entity, 'id'>) => Promise<Entity>;
  findOneById: (id: string) => Promise<Entity | null>;
}

export interface IMerchantRepo extends IBaseRepository<MerchantEntity> {
  findOneByUserId: (email: string) => Promise<MerchantEntity | null>;
}

export class MerchantRepo implements IMerchantRepo {
  constructor(private db: DB) {
    // this.collection.drop();
    // this.collection.createIndex({ email: 1 }, { unique: true });
  }

  private get collection() {
    return this.db.mongoDb.collection<Omit<MerchantEntity, 'id'>>('merchant');
  }

  private projection = {
    _id: 0,
    id: { $toString: '$_id' },
    name: 1,
    address: 1,
    phoneNumber: 1,
    userId: 1,
    cuisines: 1,
    images: 1,
    menu: 1,
  };

  async create(data: Omit<MerchantEntity, 'id'>) {
    const { insertedId } = await this.collection.insertOne({ ...data });

    return {
      id: insertedId.toString(),
      ...data,
    };
  }

  async findOneById(id: string) {
    return await this.collection.findOne<MerchantEntity>(
      { _id: this.db.toObjectId(id) },
      { projection: this.projection }
    );
  }

  async findOneByUserId(userId: string) {
    return await this.collection.findOne<MerchantEntity>(
      {
        where: {
          userId,
        },
      },
      { projection: this.projection }
    );
  }

  async findAll() {
    return await this.collection
      .find({}, { projection: this.projection })
      .toArray();
  }

  update() {}
  delete() {}
}

export const merchantRepo = new MerchantRepo(db);

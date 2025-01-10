import { DateTime } from "luxon";
import {
  BaseModel,
  beforeFetch,
  beforeFind,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ModelQueryBuilderContract,
} from "@ioc:Adonis/Lucid/Orm";
import Address from "./Address";
import Product from "./Product";

export default class Supplier extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column({ serializeAs: "id" })
  public uuid: string;

  @column()
  public name: string;

  @column({ serializeAs: null })
  public addressId: number;

  @belongsTo(() => Address)
  public address: BelongsTo<typeof Address>;

  @hasMany(() => Product)
  public products: HasMany<typeof Product>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime;

  @beforeFind()
  @beforeFetch()
  public static ignoreDeleted(
    query: ModelQueryBuilderContract<typeof Supplier>
  ) {
    query.andWhereNull("suppliers.deleted_at");
  }
}

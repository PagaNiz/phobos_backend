import { DateTime } from "luxon";
import {
  BaseModel,
  beforeFetch,
  beforeFind,
  BelongsTo,
  belongsTo,
  column,
  ModelQueryBuilderContract,
} from "@ioc:Adonis/Lucid/Orm";
import Supplier from "./Supplier";

export default class Product extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column({ serializeAs: "id" })
  public uuid: string;

  @column()
  public name: string;

  @column()
  public category: ProductCategoryTypes;

  @column()
  public quantity: number;

  @column()
  public price: number;

  @column()
  public supplierPrice: number;

  @column({ serializeAs: null })
  public supplierId: number;

  @belongsTo(() => Supplier)
  public supplier: BelongsTo<typeof Supplier>;

  @column.dateTime({ serializeAs: "expirationDate" })
  public expirationDate: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime;

  @beforeFind()
  @beforeFetch()
  public static ignoreDeleted(
    query: ModelQueryBuilderContract<typeof Product>
  ) {
    query.andWhereNull("products.deleted_at");
  }
}

export enum ProductCategoryTypes {
  doces = "Doces",
  bebidas = "Bebidas",
  salgados = "salgados",
}

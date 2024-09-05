import { DateTime } from "luxon";
import {
  BaseModel,
  beforeFetch,
  beforeFind,
  column,
  ModelQueryBuilderContract,
} from "@ioc:Adonis/Lucid/Orm";

export default class PurchaseOrderProduct extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column({ serializeAs: "id" })
  public uuid: string;

  @column({ serializeAs: "PurchaseOrderId" })
  public purchaseOrderId: number;

  @column.dateTime({ autoCreate: true, serializeAs: "stockOrder" })
  public stockOrder: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime;

  @beforeFind()
  @beforeFetch()
  public static ignoreDeleted(
    query: ModelQueryBuilderContract<typeof PurchaseOrderProduct>
  ) {
    query.andWhereNull("purchase_order_products.deleted_at");
  }
}

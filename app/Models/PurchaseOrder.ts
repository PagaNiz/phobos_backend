import {
  BaseModel,
  beforeFetch,
  beforeFind,
  column,
  ModelQueryBuilderContract,
} from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class PurchaseOrder extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column({ serializeAs: "id" })
  public uuid: string;

  @column({ serializeAs: "numberDocument" })
  public numberDocument: string;

  @column({ serializeAs: "totalPrice" })
  public totalPrice: number;

  @column({ serializeAs: "paymentMethood" })
  public paymentMethood: PurchaseOrderTypes;

  @column()
  public paid: boolean;

  @column()
  public status: PurchaseOrderStatus;

  @column({ serializeAs: null })
  public clientId: number;

  @column.dateTime()
  public deliveredDate: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime;

  @beforeFind()
  @beforeFetch()
  public static ignoreDeleted(
    query: ModelQueryBuilderContract<typeof PurchaseOrder>
  ) {
    query.andWhereNull("purchase_orders.deleted_at");
  }
}

export enum PurchaseOrderTypes {
  PIX = "PIX",
  CREDIT_CARD = "CREDIT_CARD",
  DEDIT_CARD = "DEDIT_CARD",
  CASH = "CASH",
}

export enum PurchaseOrderStatus {
  REGISTERED_ORDER = "REGISTERED_ORDER",
  PREPARING_ORDER = "PREPARING_ORDER",
  DELIVERED = "DELIVERED",
}

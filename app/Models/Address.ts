import { DateTime } from "luxon";
import {
  BaseModel,
  beforeFetch,
  beforeFind,
  column,
  ModelQueryBuilderContract,
} from "@ioc:Adonis/Lucid/Orm";

export default class Address extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column({ serializeAs: "id" })
  public uuid: string;

  @column()
  public street: string;

  @column()
  public number: number;

  @column()
  public neighborhood: string;

  @column()
  public complement: string | null;

  @column()
  public city: string;

  @column()
  public state: string;

  @column()
  public country: string;

  @column({ serializeAs: "zipCode" })
  public zipCode: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime;

  @beforeFind()
  @beforeFetch()
  public static ignoreDeleted(
    query: ModelQueryBuilderContract<typeof Address>
  ) {
    query.andWhereNull("addresses.deleted_at");
  }
}

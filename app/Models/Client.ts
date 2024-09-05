import {
  BaseModel,
  beforeFetch,
  beforeFind,
  column,
  ModelQueryBuilderContract,
} from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class Client extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column({ serializeAs: "id" })
  public uuid: string;

  @column()
  public name: string;

  @column()
  public phone: string;

  @column()
  public street: string;

  @column()
  public number: number;

  @column()
  public neighborhood: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime;

  @beforeFind()
  @beforeFetch()
  public static ignoreDeleted(query: ModelQueryBuilderContract<typeof Client>) {
    query.andWhereNull("clients.deleted_at");
  }
}

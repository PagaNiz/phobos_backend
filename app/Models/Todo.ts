import { DateTime } from "luxon";
import {
  BaseModel,
  beforeFetch,
  beforeFind,
  column,
  ModelQueryBuilderContract,
} from "@ioc:Adonis/Lucid/Orm";

export default class Todo extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column({ serializeAs: "id" })
  public uuid: string;

  @column()
  public title: string;

  @column()
  public desc: string;

  @column()
  public done: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime;

  @beforeFind()
  @beforeFetch()
  public static ignoreDeleted(query: ModelQueryBuilderContract<typeof Todo>) {
    query.andWhereNull("todo.deleted_at");
  }
}

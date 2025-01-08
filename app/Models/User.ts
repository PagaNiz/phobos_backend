import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  beforeFind,
  beforeFetch,
  ModelQueryBuilderContract,
} from "@ioc:Adonis/Lucid/Orm";
import Todo from "./Todo";

export default class User extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column({ serializeAs: "id" })
  public uuid: string;

  @column()
  public name: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column({ serializeAs: "rememberMeToken" })
  public rememberMeToken: string | null;

  @column.dateTime({ serializeAs: "createdAt", autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({
    serializeAs: "updatedAt",
    autoCreate: true,
    autoUpdate: true,
  })
  public updatedAt: DateTime;

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime;

  @hasMany(() => Todo)
  public todos: HasMany<typeof Todo>;

  @beforeFind()
  @beforeFetch()
  public static ignoreDeleted(query: ModelQueryBuilderContract<typeof User>) {
    query.andWhereNull("users.deleted_at");
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}

import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

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
}

import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { ProductCategoryTypes } from "App/Models/Product";

export default class extends BaseSchema {
  protected tableName = "products";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .enum("category", Object.values(ProductCategoryTypes))
        .notNullable()
        .defaultTo(ProductCategoryTypes.bebidas)
        .after("name");
      table.decimal("price").after("quantity");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("category");
      table.dropColumn("price");
    });
  }
}

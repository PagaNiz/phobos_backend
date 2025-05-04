import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "products";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("supplier_id")
        .unsigned()
        .references("id")
        .inTable("suppliers")
        .after("supplier_price");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign("supplier_id");
      table.dropColumn("supplier_id");
    });
  }
}

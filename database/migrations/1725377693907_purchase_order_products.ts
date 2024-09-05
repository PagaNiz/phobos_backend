import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "purchase_order_products";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.uuid("uuid").unique().notNullable();
      table
        .integer("purchase_order_id")
        .unsigned()
        .references("id")
        .inTable("purchase_orders");
      table.timestamp("stock_order", { useTz: true });
      table.timestamp("created_at", { useTz: true }).notNullable();
      table.timestamp("updated_at", { useTz: true }).notNullable();
      table.timestamp("deleted_at", { useTz: true }).nullable().defaultTo(null);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

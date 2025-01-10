import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "suppliers";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.uuid("uuid").unique().notNullable();
      table.string("name").notNullable();
      table
        .integer("address_id")
        .unsigned()
        .references("id")
        .inTable("addresses");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
      table.timestamp("deleted_at", { useTz: true }).nullable().defaultTo(null);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

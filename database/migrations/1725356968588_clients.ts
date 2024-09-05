import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "clients";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.uuid("uuid").unique().notNullable();
      table.string("name").notNullable();
      table.string("phone").notNullable();
      table.string("street").notNullable();
      table.integer("number").notNullable();
      table.string("neighborhood").notNullable();
      table.timestamp("created_at", { useTz: true }).notNullable();
      table.timestamp("updated_at", { useTz: true }).notNullable();
      table.timestamp("deleted_at", { useTz: true }).nullable().defaultTo(null);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

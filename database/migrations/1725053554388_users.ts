import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.uuid("uuid").unique().notNullable();
      table.string("name", 255).notNullable();
      table.string("email", 255).notNullable().unique();
      table.string("password", 180).notNullable();
      table.string("remember_me_token").nullable();
      table.timestamp("created_at", { useTz: true }).notNullable();
      table.timestamp("updated_at", { useTz: true }).notNullable();
      table.timestamp("deleted_at", { useTz: true }).nullable().defaultTo(null);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

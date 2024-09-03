import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "clients";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("phone").notNullable();
      table.string("street").notNullable();
      table.integer("number").notNullable();
      table.string("neighborhood").notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import {
  PurchaseOrderStatus,
  PurchaseOrderTypes,
} from "App/Models/PurchaseOrder";

export default class extends BaseSchema {
  protected tableName = "purchase_orders";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.uuid("uuid").unique().notNullable();
      table.string("number_document").notNullable();
      table.integer("total_price").notNullable();
      table.boolean("paid");
      table
        .enum("payment_methood", Object.values(PurchaseOrderTypes))
        .notNullable()
        .defaultTo(PurchaseOrderTypes.CREDIT_CARD);
      table.enum("status", Object.values(PurchaseOrderStatus)).notNullable();
      table.integer("client_id").unsigned().references("id").inTable("clients");
      table.timestamp("delivered_date", { useTz: true });
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
      table.timestamp("deleted_at", { useTz: true }).nullable().defaultTo(null);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

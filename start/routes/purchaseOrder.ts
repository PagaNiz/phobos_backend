import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.post("/", "PurchaseOrdersController.store");
    Route.get("/", "PurchaseOrdersController.index");
    Route.get("/:purchaseOrder(uuid)", "PurchaseOrdersController.show");
    Route.put("/:purchaseOrder(uuid)", "PurchaseOrdersController.update");
    Route.delete("/:purchaseOrder(uuid)", "PurchaseOrdersController.destroy");
  })
    .prefix("purchase-order")
    .middleware("auth:api");
}).prefix("api");

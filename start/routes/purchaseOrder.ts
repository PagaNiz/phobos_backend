import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.post("/register", "PurchaseOrdersController.store");
    Route.get("/", "PurchaseOrdersController.index");
    Route.get("/:purchaseOrder(uuid)", "PurchaseOrdersController.show");
    Route.put(
      "/update/:purchaseOrder(uuid)",
      "PurchaseOrdersController.update"
    );
    Route.delete("/delete/:id", "PurchaseOrdersController.destroy");
  })
    .prefix("purchase-order")
    .middleware("auth:api");
}).prefix("api");

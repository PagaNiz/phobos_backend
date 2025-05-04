import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.post("/", "SuppliersController.store");
    Route.get("/", "SuppliersController.index");
    Route.get("/:supplier(uuid)", "SuppliersController.show");
    Route.put("/:supplier(uuid)", "SuppliersController.update");
    Route.delete("/:supplier(uuid)", "SuppliersController.destroy");
  })
    .prefix("suppliers")
    .middleware("auth:api");
}).prefix("api");

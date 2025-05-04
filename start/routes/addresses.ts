import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.post("/", "AddressesController.store");
    Route.get("/", "AddressesController.index");
    Route.get("/:address(uuid)", "AddressesController.show");
    Route.put("/:address(uuid)", "AddressesController.update");
    Route.delete("/:address(uuid)", "AddressesController.destroy");
  })
    .prefix("addresses")
    .middleware("auth:api");
}).prefix("api");

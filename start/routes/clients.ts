import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.post("/", "ClientsController.store");
    Route.get("/", "ClientsController.index");
    Route.get("/:client(uuid)", "ClientsController.show");
    Route.put("/:client(uuid)", "ClientsController.update");
    Route.delete("/:client(uuid)", "ClientsController.destroy");
  })
    .prefix("client")
    .middleware("auth:api");
}).prefix("api");

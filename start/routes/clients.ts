import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.post("/register", "ClientsController.store");
    Route.get("/", "ClientsController.index");
    Route.get("/:id", "ClientsController.show");
    Route.put("/update/:id", "ClientsController.update");
    Route.delete("/delete/:id", "ClientsController.destroy");
  })
    .prefix("client")
    .middleware("auth:api");
}).prefix("api");

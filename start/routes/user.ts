import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.post("/register", "UsersController.store");
    Route.get("/", "UsersController.index");
    Route.get("/:user(uuid)", "UsersController.show");
    Route.put("/update/:id", "UsersController.update");
    Route.delete("/delete/:id", "UsersController.destroy");
  })
    .prefix("user")
    .middleware("auth:api");
}).prefix("api");

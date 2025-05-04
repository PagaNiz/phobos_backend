import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.post("/", "ProductsController.store");
      Route.get("/", "ProductsController.index");
      Route.get("/:product(uuid)", "ProductsController.show");
      Route.put("/:product(uuid)", "ProductsController.update");
      Route.delete("/:product(uuid)", "ProductsController.destroy");
    }).prefix("product");
  }).middleware("auth:api");
}).prefix("api");

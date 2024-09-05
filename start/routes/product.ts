import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.post("register", "ProductsController.store");
      Route.get("/", "ProductsController.index");
      Route.get("/:id", "ProductsController.show");
      Route.put("update/:id", "ProductsController.update");
      Route.delete("delete/:id", "ProductsController.destroy");
    }).prefix("product");
  }).middleware("auth:api");
}).prefix("api");

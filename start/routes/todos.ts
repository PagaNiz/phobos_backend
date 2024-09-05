import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.post("register", "TodosController.store");
    Route.get("/", "TodosController.index");
    Route.get("/:id", "TodosController.show");
    Route.put("update/:id", "TodosController.update");
    Route.put("delete/:id", "TodosController.destroy");
  })
    .prefix("todos")
    .middleware("auth:api");
}).prefix("api");

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

Route.group(() => {
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");

  Route.group(() => {
    Route.post("todos", "TodosController.store");
    Route.get("todos", "TodosController.index");
    Route.get("todos/:id", "TodosController.show");
    Route.put("todos/update/:id", "TodosController.update");
    Route.put("todos/delete/:id", "TodosController.destroy");

    Route.post("client/register", "ClientsController.store");
    Route.get("client", "ClientsController.index");
    Route.get("client/:id", "ClientsController.show");
    Route.put("client/update/:id", "ClientsController.update");
    Route.delete("client/delete/:id", "ClientsController.destroy");
  }).middleware("auth:api");
}).prefix("api");

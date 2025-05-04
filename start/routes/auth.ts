import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");
  Route.delete("user/:user(uuid)", "AuthController.destroy");
}).prefix("api");

Route.group(() => {
  Route.get("/login", "AuthController.show").middleware("auth:api");
}).prefix("api");

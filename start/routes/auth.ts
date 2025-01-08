import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");
  Route.get("login", "AuthController.show");
  Route.delete("user/delete", "AuthController.destroy");
}).prefix("api");

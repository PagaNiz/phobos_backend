import Server from "@ioc:Adonis/Core/Server";

Server.middleware.register([
  () => import("@ioc:Adonis/Core/BodyParser"),
  () => import("@ioc:Adonis/Addons/RmbMiddleware"),
]);
Server.middleware.registerNamed({
  auth: "App/Middleware/Auth",
});

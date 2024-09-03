import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Client from "App/Models/Client";

export default class ClientsController {
  public async index({ request }: HttpContextContract) {
    const clients = await Client.query();
    return clients;
  }

  public async show({ request, params }: HttpContextContract) {
    try {
      const client = await Client.find(params.id);
      if (client) {
        return client;
      } else {
        return { message: "Client not exist" };
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const user = await auth.authenticate();
    const client = new Client();
    client.name = request.input("name");
    client.phone = request.input("phone");
    client.street = request.input("street");
    client.number = request.input("number");
    client.neighborhood = request.input("neighborhood");
    await client.save();
    console.log(response.json({ message: "Client created successfully!" }));
    return client;
  }

  public async update({ auth, request, params }: HttpContextContract) {
    const client = await Client.find(params.id);
    if (client) {
      client.name = request.input("name");
      client.phone = request.input("phone");
      client.street = request.input("street");
      client.number = request.input("number");
      client.neighborhood = request.input("neighborhood");

      if (await client.save()) {
        return client;
      }
      return; // 422
    }
    return; // 401
  }

  public async destroy({
    response,
    auth,
    request,
    params,
  }: HttpContextContract) {
    const user = await auth.authenticate();
    const client = await Client.query().where("id", params.id).delete();
    return response.json({ message: "Client deleted successfully" });
  }
}

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Client from "App/Models/Client";
import { schema } from "@ioc:Adonis/Core/Validator";
import { DateTime } from "luxon";
import { randomUUID } from "node:crypto";
import { bind } from "@adonisjs/route-model-binding";

export default class ClientsController {
  public async index({ response }: HttpContextContract) {
    const clients = await Client.query();
    return response.ok(clients);
  }

  @bind()
  public async show({ response }: HttpContextContract, client: Client) {
    return response.ok(client);
  }

  public async store({ request, response }: HttpContextContract) {
    const schemaParsedType = schema.create({
      name: schema.string(),
      phone: schema.string(),
      street: schema.string(),
      number: schema.number(),
      neighborhood: schema.string(),
    });

    const { name, phone, street, number, neighborhood } =
      await request.validate({
        schema: schemaParsedType,
      });

    const client = await Client.create({
      uuid: randomUUID(),
      name,
      phone,
      street,
      number,
      neighborhood,
    });

    return response.created(client);
  }

  @bind()
  public async update(
    { request, response }: HttpContextContract,
    client: Client
  ) {
    const schemaParsedType = schema.create({
      name: schema.string(),
      phone: schema.string(),
      street: schema.string(),
      number: schema.number(),
      neighborhood: schema.string(),
    });

    const { name, phone, street, number, neighborhood } =
      await request.validate({
        schema: schemaParsedType,
      });

    try {
      client.merge({
        name,
        phone,
        street,
        number,
        neighborhood,
      });

      await client.save();
      return response.ok(client);
    } catch (error) {
      console.log(error);
      return response.badRequest(error);
    }
  }

  @bind()
  public async destroy({ response }: HttpContextContract, client: Client) {
    await client
      .merge({
        deletedAt: DateTime.now(),
      })
      .save();
    return response.noContent();
  }
}

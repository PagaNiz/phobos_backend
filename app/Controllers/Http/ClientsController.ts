import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Client from "App/Models/Client";
import { schema } from "@ioc:Adonis/Core/Validator";
import { DateTime } from "luxon";
import { randomUUID } from "node:crypto";

export default class ClientsController {
  public async index({ response }: HttpContextContract) {
    const clients = await Client.query();
    return response.ok(clients);
  }

  public async show({ params, response }: HttpContextContract) {
    const client = await Client.findByOrFail("uuid", params.id);
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

  public async update({ request, response, params }: HttpContextContract) {
    const client = await Client.findByOrFail("uuid", params.id);
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

  public async destroy({ response, params }: HttpContextContract) {
    const client = await Client.findByOrFail("uuid", params.id);
    await client
      .merge({
        deletedAt: DateTime.now(),
      })
      .save();
    return response.noContent();
  }
}

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Address from "App/Models/Address";
import { schema } from "@ioc:Adonis/Core/Validator";
import { randomUUID } from "node:crypto";
import { DateTime } from "luxon";
import { bind } from "@adonisjs/route-model-binding";

export default class AddressesController {
  public async index({ response }: HttpContextContract) {
    const addresses = await Address.query();
    return response.ok(addresses);
  }

  @bind()
  public async show({ response }: HttpContextContract, address: Address) {
    return response.ok(address);
  }

  public async store({ request, response }: HttpContextContract) {
    const schemaParsedType = schema.create({
      street: schema.string(),
      number: schema.number(),
      neighborhood: schema.string(),
      complement: schema.string(),
      city: schema.string(),
      state: schema.string(),
      country: schema.string(),
      zipCode: schema.string(),
    });

    const {
      street,
      number,
      neighborhood,
      complement,
      city,
      state,
      country,
      zipCode,
    } = await request.validate({
      schema: schemaParsedType,
    });

    const adresses = await Address.create({
      uuid: randomUUID(),
      street,
      number,
      neighborhood,
      complement,
      city,
      state,
      country,
      zipCode,
    });

    return response.created(adresses);
  }

  @bind()
  public async update(
    { request, response }: HttpContextContract,
    address: Address
  ) {
    const schemaParsedType = schema.create({
      street: schema.string(),
      number: schema.number(),
      neighborhood: schema.string(),
      complement: schema.string(),
      city: schema.string(),
      state: schema.string(),
      country: schema.string(),
      zipCode: schema.string(),
    });

    const {
      street,
      number,
      neighborhood,
      complement,
      city,
      state,
      country,
      zipCode,
    } = await request.validate({
      schema: schemaParsedType,
    });

    try {
      address.merge({
        street,
        number,
        neighborhood,
        complement,
        city,
        state,
        country,
        zipCode,
      });

      await address.save();
      return response.ok(address);
    } catch (error) {
      console.log(error);
      return response.badRequest(error);
    }
  }

  @bind()
  public async destroy({ response }: HttpContextContract, address: Address) {
    await address
      .merge({
        deletedAt: DateTime.now(),
      })
      .save();
    return response.noContent();
  }
}

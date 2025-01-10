import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { rules, schema } from "@ioc:Adonis/Core/Validator";
import { randomUUID } from "node:crypto";
import { DateTime } from "luxon";
import Supplier from "App/Models/Supplier";
import Address from "App/Models/Address";
import { bind } from "@adonisjs/route-model-binding";

export default class SuppliersController {
  public async index({ response }: HttpContextContract) {
    const suppliers = await Supplier.query();
    return response.ok(suppliers);
  }

  @bind()
  public async show({ response }: HttpContextContract, supplier: Supplier) {
    return response.ok(supplier);
  }

  public async store({ request, response }: HttpContextContract) {
    const schemaParsedType = schema.create({
      name: schema.string(),
      addressId: schema.string([rules.uuid()]),
      street: schema.string(),
      number: schema.number(),
      neighborhood: schema.string(),
      complement: schema.string(),
      city: schema.string(),
      country: schema.string(),
      zipCode: schema.string(),
    });

    const {
      name,
      addressId,
      street,
      number,
      neighborhood,
      complement,
      city,
      country,
      zipCode,
    } = await request.validate({
      schema: schemaParsedType,
    });

    const address = await Address.findByOrFail("uuid", addressId);

    const supplier = await Supplier.create({
      uuid: randomUUID(),
      name,
      addressId: address.id,
      street,
      number,
      neighborhood,
      complement,
      city,
      country,
      zipCode,
    });

    return response.created(supplier);
  }

  @bind()
  public async update(
    { request, response }: HttpContextContract,
    supplier: Supplier
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
      supplier.merge({
        street,
        number,
        neighborhood,
        complement,
        city,
        state,
        country,
        zipCode,
      });

      await supplier.save();
      return response.ok(supplier);
    } catch (error) {
      console.log(error);
      return response.badRequest(error);
    }
  }

  @bind()
  public async destroy({ response }: HttpContextContract, supplier: Supplier) {
    await supplier
      .merge({
        deletedAt: DateTime.now(),
      })
      .save();
    return response.noContent();
  }
}

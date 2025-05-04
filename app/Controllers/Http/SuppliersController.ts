import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { rules, schema } from "@ioc:Adonis/Core/Validator";
import { randomUUID } from "node:crypto";
import { DateTime } from "luxon";
import Supplier from "App/Models/Supplier";
import Address from "App/Models/Address";
import { bind } from "@adonisjs/route-model-binding";

export default class SuppliersController {
  public async index({ response }: HttpContextContract) {
    const suppliers = await Supplier.query().preload("address").paginate(1, 10);
    return response.ok(suppliers);
  }

  @bind()
  public async show({ response }: HttpContextContract, supplier: Supplier) {
    return response.ok(supplier);
  }

  public async store({ request, response }: HttpContextContract) {
    const schemaParsedType = schema.create({
      name: schema.string(),
      addressId: schema.string.nullableAndOptional([
        rules.uuid(),
        rules.exists({ table: "address", column: "uuid" }),
      ]),
      street: schema.string(),
      number: schema.number(),
      neighborhood: schema.string(),
      complement: schema.string.nullableAndOptional(),
      city: schema.string(),
      state: schema.string(),
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
      state,
      country,
      zipCode,
    } = await request.validate({
      schema: schemaParsedType,
    });

    let address: Address;
    if (addressId) {
      address = await Address.findByOrFail("uuid", addressId);
    } else {
      address = await Address.create({
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
    }

    const supplier = await Supplier.create({
      uuid: randomUUID(),
      name,
      addressId: address.id,
    });

    return response.created(supplier);
  }

  @bind()
  public async update(
    { request, response }: HttpContextContract,
    supplier: Supplier
  ) {
    const schemaParsedType = schema.create({
      addressId: schema.string.optional([
        rules.uuid(),
        rules.exists({ table: "addresses", column: "uuid" }),
      ]),
      name: schema.string(),
      street: schema.string(),
      number: schema.number(),
      neighborhood: schema.string(),
      complement: schema.string.nullableAndOptional(),
      city: schema.string(),
      state: schema.string(),
      country: schema.string(),
      zipCode: schema.string(),
    });

    const {
      name,
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
      if (name) {
        supplier.merge({ name });
      }
      if (
        street ||
        number ||
        neighborhood ||
        complement ||
        city ||
        state ||
        country ||
        zipCode
      ) {
        const address = await supplier.related("address").query().firstOrFail();
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
      }
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

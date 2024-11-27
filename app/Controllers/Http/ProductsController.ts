import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product, { ProductCategoryTypes } from "App/Models/Product";
import { schema } from "@ioc:Adonis/Core/Validator";
import { DateTime } from "luxon";
import { randomUUID } from "node:crypto";

export default class ProductsController {
  public async index({ response }: HttpContextContract) {
    const product = await Product.query();
    return response.ok(product);
  }

  public async show({ params, response }: HttpContextContract) {
    const product = await Product.findByOrFail("uuid", params.id);
    return response.ok(product);
  }

  public async store({ request, response }: HttpContextContract) {
    const schemaParsedType = schema.create({
      name: schema.string(),
      category: schema.enum(Object.values(ProductCategoryTypes)),
      quantity: schema.number(),
      price: schema.number(),
      supplierPrice: schema.number(),
      expirationDate: schema.date(),
    });

    const { name, category, quantity, price, supplierPrice, expirationDate } =
      await request.validate({
        schema: schemaParsedType,
      });

    const product = await Product.create({
      uuid: randomUUID(),
      name,
      category,
      quantity,
      price,
      supplierPrice,
      expirationDate,
    });

    return response.created(product);
  }

  public async update({ request, response, params }: HttpContextContract) {
    const product = await Product.findByOrFail("uuid", params.id);
    const schemaParsedType = schema.create({
      name: schema.string(),
      category: schema.enum(Object.values(ProductCategoryTypes)),
      quantity: schema.number(),
      price: schema.number(),
      supplierPrice: schema.number(),
      expirationDate: schema.date(),
    });

    const { name, category, quantity, price, supplierPrice, expirationDate } =
      await request.validate({
        schema: schemaParsedType,
      });

    try {
      product.merge({
        name,
        category,
        quantity,
        price,
        supplierPrice,
        expirationDate,
      });

      await product.save();
      return response.ok(product);
    } catch (error) {
      console.log(error);
      return response.badRequest(error);
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    const purchaseOrders = await Product.findByOrFail("uuid", params.id);
    await purchaseOrders
      .merge({
        deletedAt: DateTime.now(),
      })
      .save();
    return response.noContent();
  }
}

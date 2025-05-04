import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product, { ProductCategoryTypes } from "App/Models/Product";
import { rules, schema } from "@ioc:Adonis/Core/Validator";
import { DateTime } from "luxon";
import { randomUUID } from "node:crypto";
import { bind } from "@adonisjs/route-model-binding";
import Supplier from "App/Models/Supplier";

export default class ProductsController {
  public async index({ response }: HttpContextContract) {
    const product = await Product.query();
    return response.ok(product);
  }

  @bind()
  public async show({ response }: HttpContextContract, product: Product) {
    return response.ok(product);
  }

  public async store({ request, response }: HttpContextContract) {
    const schemaParsedType = schema.create({
      supplierId: schema.string([
        rules.uuid(),
        rules.exists({ table: "suppliers", column: "uuid" }),
      ]),
      name: schema.string(),
      category: schema.enum(Object.values(ProductCategoryTypes)),
      quantity: schema.number(),
      price: schema.number(),
      supplierPrice: schema.number(),
      expirationDate: schema.date(),
    });

    const {
      supplierId,
      name,
      category,
      quantity,
      price,
      supplierPrice,
      expirationDate,
    } = await request.validate({
      schema: schemaParsedType,
    });

    const supplier = await Supplier.findByOrFail("uuid", supplierId);

    const product = await Product.create({
      uuid: randomUUID(),
      supplierId: supplier.id,
      name,
      category,
      quantity,
      price,
      supplierPrice,
      expirationDate,
    });

    return response.created(product);
  }

  @bind()
  public async update(
    { request, response }: HttpContextContract,
    product: Product
  ) {
    const schemaParsedType = schema.create({
      supplierId: schema.string([
        rules.uuid(),
        rules.exists({ table: "suppliers", column: "uuid" }),
      ]),
      name: schema.string(),
      category: schema.enum(Object.values(ProductCategoryTypes)),
      quantity: schema.number(),
      price: schema.number(),
      supplierPrice: schema.number(),
      expirationDate: schema.date(),
    });

    const {
      supplierId,
      name,
      category,
      quantity,
      price,
      supplierPrice,
      expirationDate,
    } = await request.validate({
      schema: schemaParsedType,
    });

    try {
      const supplier = await Supplier.findByOrFail("uuid", supplierId);
      product.merge({
        supplierId: supplier.id,
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

  @bind()
  public async destroy({ response }: HttpContextContract, product: Product) {
    await product
      .merge({
        deletedAt: DateTime.now(),
      })
      .save();
    return response.noContent();
  }
}

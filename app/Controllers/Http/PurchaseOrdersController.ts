import { bind } from "@adonisjs/route-model-binding";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { rules, schema } from "@ioc:Adonis/Core/Validator";

import PurchaseOrder, {
  PurchaseOrderStatus,
  PurchaseOrderTypes,
} from "App/Models/PurchaseOrder";
import { DateTime } from "luxon";
import { randomUUID } from "node:crypto";

export default class PurchaseOrdersController {
  public async index({ response }: HttpContextContract) {
    const purchaseOrder = await PurchaseOrder.query();
    return response.ok(purchaseOrder);
  }

  @bind()
  public async show(
    { response }: HttpContextContract,
    purchaseOrder: PurchaseOrder
  ) {
    console.log("purchaseOrder");
  }

  public async store({ request, response }: HttpContextContract) {
    const schemaParsedType = schema.create({
      numberDocument: schema.string(),
      totalPrice: schema.number([rules.unsigned()]),
      paymentMethood: schema.enum(Object.values(PurchaseOrderTypes)),
      paid: schema.boolean(),
      status: schema.enum(Object.values(PurchaseOrderStatus)),
      deliveredDate: schema.date(),
    });

    const {
      numberDocument,
      totalPrice,
      paymentMethood,
      paid,
      status,
      deliveredDate,
    } = await request.validate({
      schema: schemaParsedType,
    });

    const purchaseOrder = await PurchaseOrder.create({
      uuid: randomUUID(),
      numberDocument,
      totalPrice,
      paymentMethood,
      paid,
      status,
      deliveredDate,
    });

    return response.created(purchaseOrder);
  }

  public async update({ request, response, params }: HttpContextContract) {
    const purchaseOrder = await PurchaseOrder.findByOrFail("uuid", params.id);
    const schemaParsedType = schema.create({
      numberDocument: schema.string(),
      totalPrice: schema.number([rules.unsigned()]),
      paymentMethood: schema.enum(Object.values(PurchaseOrderTypes)),
      paid: schema.boolean(),
      status: schema.enum(Object.values(PurchaseOrderStatus)),
      deliveredDate: schema.date(),
    });

    const {
      numberDocument,
      totalPrice,
      paymentMethood,
      paid,
      status,
      deliveredDate,
    } = await request.validate({
      schema: schemaParsedType,
    });

    try {
      purchaseOrder.merge({
        numberDocument,
        totalPrice,
        paymentMethood,
        paid,
        status,
        deliveredDate,
      });

      await purchaseOrder.save();
      return response.ok(purchaseOrder);
    } catch (error) {
      console.log(error);
      return response.badRequest(error);
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    const purchaseOrders = await PurchaseOrder.findByOrFail("uuid", params.id);
    await purchaseOrders
      .merge({
        deletedAt: DateTime.now(),
      })
      .save();
    return response.noContent();
  }
}

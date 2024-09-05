import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";
import Todo from "App/Models/Todo";
import { DateTime } from "luxon";
import { randomUUID } from "node:crypto";

export default class TodosController {
  public async index({ response }: HttpContextContract) {
    const todos = await Todo.query();
    return response.ok(todos);
  }

  public async show({ params, response }: HttpContextContract) {
    const todo = await Todo.findByOrFail("uuid", params.id);
    return response.ok(todo);
  }

  public async store({ request, response }: HttpContextContract) {
    const schemaParsedType = schema.create({
      title: schema.string(),
      desc: schema.string(),
    });
    const { title, desc } = await request.validate({
      schema: schemaParsedType,
    });

    const todo = await Todo.create({
      uuid: randomUUID(),
      title,
      desc,
    });

    return response.created(todo);
  }

  public async update({ request, response, params }: HttpContextContract) {
    const todo = await Todo.findByOrFail("uuid", params.id);
    const schemaParsedType = schema.create({
      title: schema.string(),
      desc: schema.string(),
      done: schema.boolean(),
    });

    const { title, desc, done } = await request.validate({
      schema: schemaParsedType,
    });

    try {
      todo.merge({
        title,
        desc,
        done,
      });

      await todo.save();
      return response.ok(todo);
    } catch (error) {
      console.log(error);
      return response.badRequest(error);
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    const todo = await Todo.findByOrFail("uuid", params.id);
    await todo
      .merge({
        deletedAt: DateTime.now(),
      })
      .save();
    return response.noContent();
  }
}

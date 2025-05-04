import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import { randomUUID } from "node:crypto";
import { schema } from "@ioc:Adonis/Core/Validator";
import { DateTime } from "luxon";
import { bind } from "@adonisjs/route-model-binding";

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.query();
    return response.ok(users);
  }

  @bind()
  public async show({ response }: HttpContextContract, user: User) {
    return response.ok(user);
  }

  public async store({ request, response }: HttpContextContract) {
    const schemaParsedType = schema.create({
      name: schema.string(),
      email: schema.string(),
      password: schema.string(),
    });
    const { name, email, password } = await request.validate({
      schema: schemaParsedType,
    });
    const user = await User.create({
      uuid: randomUUID(),
      name,
      email,
      password,
    });
    return response.created(user);
  }

  @bind()
  public async update({ request, response }: HttpContextContract, user: User) {
    const schemaParsedType = schema.create({
      name: schema.string(),
      email: schema.string(),
      password: schema.string(),
    });
    const { name, email, password } = await request.validate({
      schema: schemaParsedType,
    });
    try {
      user.merge({
        name,
        email,
        password,
      });
      await user.save();
      return response.created(user);
    } catch (error) {
      return response.badRequest(error);
    }
  }

  @bind()
  public async destroy({ response }: HttpContextContract, user: User) {
    await user.merge({ deletedAt: DateTime.now() }).save();
    return response.noContent();
  }
}

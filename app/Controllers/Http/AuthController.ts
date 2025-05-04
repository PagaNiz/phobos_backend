import { bind } from "@adonisjs/route-model-binding";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";
import { DateTime } from "luxon";
import { randomUUID } from "node:crypto";
export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const schemaParsedType = schema.create({
      email: schema.string([rules.email()]),
      password: schema.string(),
    });
    const { email, password } = await request.validate({
      schema: schemaParsedType,
    });

    const token = await auth.use("api").attempt(email, password, {
      expiresIn: "10 days",
    });
    return token.toJSON();
  }

  public async register({ request, auth }: HttpContextContract) {
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

    const token = await auth.use("api").login(user, {
      expiresIn: "10 days",
    });

    return token.toJSON();
  }

  public async show({ auth, response }: HttpContextContract) {
    const user = auth.user;
    if (!user) return response.unauthorized();

    return response.ok(user);
  }

  @bind()
  public async destroy({ response }: HttpContextContract, user: User) {
    await user
      .merge({
        deletedAt: DateTime.now(),
      })
      .save();
    return response.noContent();
  }
}

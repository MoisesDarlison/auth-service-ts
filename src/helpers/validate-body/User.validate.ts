import { InferType, object, string } from "yup";

const UserSchemaSignUp = object({
  email: string().nullable().email().required(),
  password: string().nullable().min(5).required(),
  permissionLevel: string().optional(),
});

const UserSchemaSignIn = object({
  email: string().nullable().email().required(),
  password: string().nullable().min(5).required(),
});

type userSignUp = InferType<typeof UserSchemaSignUp>;
type userSignIn = InferType<typeof UserSchemaSignIn>;

class ValidateUser {
  static async signUp(body: userSignUp): Promise<void> {
    await UserSchemaSignUp.validate(body);
  }

  static async signIn(body: userSignIn): Promise<void> {
    await UserSchemaSignUp.validate(body);
  }
}

export { ValidateUser };

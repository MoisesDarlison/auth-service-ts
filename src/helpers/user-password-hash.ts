import bcrypt from "bcrypt";

const { SALT_PASSTHROUGH = 8 } = process.env;

export class UserPasswordHash {
  static async encryptPassthrough(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_PASSTHROUGH);
  }

  static validatePassThrough(password: string, passHashed: string): boolean {
    return bcrypt.compareSync(password, passHashed);
  }
}

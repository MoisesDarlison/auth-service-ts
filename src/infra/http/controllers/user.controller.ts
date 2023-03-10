import { Request, Response, NextFunction } from "express";
import { CreateUserUserCase } from "../../../app/use-cases/user/create-user.use-case";
import { FilterUserByIdUserCase } from "../../../app/use-cases/user/filter-user-by-id.use-case";
import { GetAllUsersUserCase } from "../../../app/use-cases/user/get-all-user.use-case";
import { UpdateNickNameByIdUserCase } from "../../../app/use-cases/user/update-nickname-by-id.use-case";
import { UserViewModelMapper } from "../mapper/user.mapper";

//TODO: Change to repo on PRD
import { FilterUserByEmailUserCase } from "../../../app/use-cases/user/filter-user-by-email.use-case";
import { GenerateToken } from "../../../helpers/generate-token";
import { UserPasswordHash } from "../../../helpers/user-password-hash";
import { repositoryUser } from "../../db/in-memory/index.in-memory.repository";
import { ValidateUser } from "../../../helpers/validate-body/User.validate";

export class UserController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      await ValidateUser.signUp(req.body);

      const userInput = {
        email: req.body.email,
        password: await UserPasswordHash.encryptPassthrough(req.body.password),
        permissionLevel: req.body.permissionLevel,
      };

      const useCase = new CreateUserUserCase(repositoryUser);
      const output = await useCase.execute(userInput);

      return res.status(201).json(UserViewModelMapper.toHTTP(output));
    } catch (error) {
      return next(error);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      await ValidateUser.signUp(req.body);
      const { email, password } = req.body;
      const useCaseFindByEmail = new FilterUserByEmailUserCase(repositoryUser);

      const output = await useCaseFindByEmail.execute(email);

      if (!output)
        return res.status(401).json({ message: "User/Pass invalid" });

      const isMatch: boolean = UserPasswordHash.validatePassThrough(
        password,
        output.password
      );

      if (!isMatch)
        return res.status(401).json({ message: "User/Pass invalid" });

      const token = GenerateToken.execute(
        output.id,
        output.email,
        output.permissionLevel
      );

      return res
        .status(200)
        .json({ ...UserViewModelMapper.toHTTP(output), token });
    } catch (error) {
      return next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = new GetAllUsersUserCase(repositoryUser);
      const output = await useCase.execute();
      return res.status(200).json(output.map(UserViewModelMapper.toHTTP));
    } catch (error) {
      return next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = new FilterUserByIdUserCase(repositoryUser);
      const { id } = req.params;
      const output = await useCase.execute(id);

      if (!output) return res.status(404).json({ message: "User not found" });

      return res.status(200).json(UserViewModelMapper.toHTTP(output));
    } catch (error) {
      return next(error);
    }
  }

  async updateNickNameById(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = new UpdateNickNameByIdUserCase(repositoryUser);
      const { id } = req.params;
      const { nickName } = req.body;

      await useCase.execute(id, nickName);

      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  }
}

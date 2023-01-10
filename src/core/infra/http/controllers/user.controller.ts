import { Request, Response } from "express";
import { CreateUserUserCase } from "../../../app/use-cases/user/create-user.use-case";
import { FilterUserByIdUserCase } from "../../../app/use-cases/user/filter-user-by-id.use-case";
import { GetAllUsersUserCase } from "../../../app/use-cases/user/get-all-user.use-case";
import { UpdateNickNameByIdUserCase } from "../../../app/use-cases/user/update-nickname-by-id.use-case";
import { UserViewModelMapper } from "../mapper/user.mapper";

//TODO: Change to repo on PRD
import { repositoryUser } from "../../db/in-memory/index.in-memory.repository";
import { UserPasswordHash } from "../../../helpers/user-password-hash";
import { FilterUserByEmailUserCase } from "../../../app/use-cases/user/filter-user-by-name.use-case";

export class UserController {
  async create(req: Request, res: Response) {
    const userInput = {
      email: req.body.email,
      password: await UserPasswordHash.encryptPassthrough(req.body.password),
      permissionLevel: req.body.permissionLevel,
    };

    const useCase = new CreateUserUserCase(repositoryUser);
    const output = await useCase.execute(userInput);

    return res.status(201).json(UserViewModelMapper.toHTTP(output));
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    const useCaseFindByEmail = new FilterUserByEmailUserCase(repositoryUser);

    const output = await useCaseFindByEmail.execute(email);

    if (!output) return res.status(400).json({ message: "User/Pass invalid" });

    const isMatch: boolean = UserPasswordHash.validatePassThrough(
      password,
      output.password
    );

    if (!isMatch) return res.status(400).json({ message: "User/Pass invalid" });

    return res.status(200).json(UserViewModelMapper.toHTTP(output));
  }

  async getAll(req: Request, res: Response) {
    const useCase = new GetAllUsersUserCase(repositoryUser);

    const output = await useCase.execute();
    return res.status(200).json(output.map(UserViewModelMapper.toHTTP));
  }

  async getById(req: Request, res: Response) {
    const useCase = new FilterUserByIdUserCase(repositoryUser);
    const { id } = req.params;
    const output = await useCase.execute(id);

    if (!output) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(UserViewModelMapper.toHTTP(output));
  }

  async updateNickNameById(req: Request, res: Response) {
    try {
      const useCase = new UpdateNickNameByIdUserCase(repositoryUser);
      const { id } = req.params;
      const { nickName } = req.body;

      await useCase.execute(id, nickName);

      return res.status(200).json({});
    } catch (error) {
      return res.status(500).json({ Message: "Internal Error" });
    }
  }
}

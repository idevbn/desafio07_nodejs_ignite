import { User } from "@modules/users/entities/User";
import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserError } from "./CreateUserError";

let createUserUseCase: CreateUserUseCase;
let inMemoryUserRepository: InMemoryUsersRepository;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  });

  it("Should be able to create an user", async () => {
    const user = await createUserUseCase.execute({
      name: "User",
      email: "user.email@test.com",
      password: "1234"
    });

    expect(user).toHaveProperty("id");
    expect(user).toBeInstanceOf(User);
  });

  it("Should not be able to create an user with an email that already exists", () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "User",
        email: "email.user@test.com",
        password: "1234"
      });

      await createUserUseCase.execute({
        name: "User 2",
        email: "email.user@test.com",
        password: "password1234"
      });
    }).rejects.toBeInstanceOf(CreateUserError);
  });
})

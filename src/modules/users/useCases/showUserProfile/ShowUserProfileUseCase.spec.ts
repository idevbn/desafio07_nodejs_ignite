import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";

let inMemoryUserRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Show Profile", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUserRepository);
  })

  it("Should be able to show a user profile", async () => {
    const user = await createUserUseCase.execute({
      name: "User Test",
      email: "user@email.com",
      password: "1234"
    });

    const userProfile = await showUserProfileUseCase.execute(user.id);

    expect(user).toHaveProperty("id");
    expect(userProfile).toEqual(user);
  });

  it("Should not be able to show an user profile if the user does not exists", () => {
    expect(async () => {
      const user_id = "1234"

      await showUserProfileUseCase.execute(user_id);
    }).rejects.toBeInstanceOf(ShowUserProfileError);
  });
});

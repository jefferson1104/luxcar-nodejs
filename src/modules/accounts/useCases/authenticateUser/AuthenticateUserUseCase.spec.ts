import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe("Autheticate User", () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
		dateProvider = new DayjsDateProvider();
		authenticateUserUseCase = new AuthenticateUserUseCase(
			usersRepositoryInMemory,
			usersTokensRepositoryInMemory,
			dateProvider
		);
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
	});

	it("should be able to authenticate an user", async () => {
		const user: ICreateUserDTO = {
			driver_license: "0012345",
			email: "user@test.com",
			password: "1234",
			name: "User Test",
		};

		await createUserUseCase.execute(user);

		const result = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password,
		});

		expect(result).toHaveProperty("token");
	});

	it("should not be able to authenticate an nonexistent user", async () => {
		await expect(
			authenticateUserUseCase.execute({
				email: "false@email.com",
				password: "1234",
			})
		).rejects.toEqual(new AppError("Email or password incorrect!"));
	});

	it("should not be able to authenticate with incorrect password", async () => {
		const user: ICreateUserDTO = {
			driver_license: "9999123",
			email: "user@examplemail.com",
			password: "1234",
			name: "User Test Error",
		};

		await createUserUseCase.execute(user);

		await expect(
			authenticateUserUseCase.execute({
				email: user.email,
				password: "incorrectPass",
			})
		).rejects.toEqual(new AppError("Email or password incorrect!"));
	});
});

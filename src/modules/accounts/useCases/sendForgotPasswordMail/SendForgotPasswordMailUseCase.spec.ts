import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		dateProvider = new DayjsDateProvider();
		usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
		mailProvider = new MailProviderInMemory();

		sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
			usersRepositoryInMemory,
			usersTokensRepositoryInMemory,
			dateProvider,
			mailProvider
		);
	});

	it("should be able to send a forgot password mail to user", async () => {
		const sendMail = jest.spyOn(mailProvider, "sendMail");

		await usersRepositoryInMemory.create({
			driver_license: "TEST-1234",
			email: "john.doe@test.com",
			name: "John Doe",
			password: "1234",
		});

		await sendForgotPasswordMailUseCase.execute("john.doe@test.com");

		expect(sendMail).toHaveBeenCalled();
	});

	it("should not be able to send an email if user does not exist", async () => {
		await expect(
			sendForgotPasswordMailUseCase.execute("testeuser@test.com")
		).rejects.toEqual(new AppError("User does not exists!"));
	});

	it("should be able to create an users token", async () => {
		const generateTokenMail = jest.spyOn(
			usersTokensRepositoryInMemory,
			"create"
		);

		await usersRepositoryInMemory.create({
			driver_license: "TOKN-5678",
			email: "john.token@test.com",
			name: "John Token",
			password: "1234",
		});

		await sendForgotPasswordMailUseCase.execute("john.token@test.com");

		expect(generateTokenMail).toHaveBeenCalled();
	});
});

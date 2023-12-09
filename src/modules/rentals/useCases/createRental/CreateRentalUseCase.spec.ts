import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { AppError } from "@shared/errors/AppError";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
	beforeEach(() => {
		rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
		createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
	});


	it("Should be able to create a new rental", async () => {
		const rental = await createRentalUseCase.execute({
			user_id: "12345",
			car_id: "112233",
			expected_return_date: new Date(),
		});

		expect(rental).toHaveProperty("id");
		expect(rental).toHaveProperty("start_date");
	});

	it("Should not be able to create a new rental if is another open to the same user", async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: "12345",
				car_id: "112233",
				expected_return_date: new Date(),
			});

			await createRentalUseCase.execute({
				user_id: "12345",
				car_id: "112233",
				expected_return_date: new Date(),
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("Should not be able to create a new rental if is another open to the same car", async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: "123",
				car_id: "testCarA",
				expected_return_date: new Date(),
			});

			await createRentalUseCase.execute({
				user_id: "321",
				car_id: "testCarA",
				expected_return_date: new Date(),
			});
		}).rejects.toBeInstanceOf(AppError);
	});
})

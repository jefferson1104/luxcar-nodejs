import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let dayjsProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
	const dayAdd24Hours = dayjs().add(1, "day").toDate();

	beforeEach(() => {
		dayjsProvider = new DayjsDateProvider();
		rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		createRentalUseCase = new CreateRentalUseCase(
			rentalsRepositoryInMemory,
			dayjsProvider,
			carsRepositoryInMemory
		);
	});

	it("Should be able to create a new rental", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Test",
			description: "Car test",
			daily_rate: 100,
			license_plate: "TST-0000",
			fine_amount: 50,
			brand: "Test",
			category_id: "123456"
		});

		const rental = await createRentalUseCase.execute({
			user_id: "12345",
			car_id: car.id,
			expected_return_date: dayAdd24Hours,
		});

		expect(rental).toHaveProperty("id");
		expect(rental).toHaveProperty("start_date");
	});

	it("Should not be able to create a new rental if is another open to the same user", async () => {
		await rentalsRepositoryInMemory.create({
			car_id: "123456",
			expected_return_date: dayAdd24Hours,
			user_id: "123456",
		});

		await expect(createRentalUseCase.execute({
			user_id: "123456",
			car_id: "654321",
			expected_return_date: dayAdd24Hours,
		})).rejects.toEqual(new AppError("There's a rental in progress for user!"));
	});

	it("Should not be able to create a new rental if is another open to the same car", async () => {
		await rentalsRepositoryInMemory.create({
			user_id: "123",
			car_id: "testCarA",
			expected_return_date: dayAdd24Hours,
		});

		await expect(createRentalUseCase.execute({
			user_id: "321",
			car_id: "testCarA",
			expected_return_date: dayAdd24Hours,
		})).rejects.toEqual(new AppError("Car is unavailable"));
	});

	it("Should not be able to create a new rental if with invalid return time", async () => {
		await expect(createRentalUseCase.execute({
			user_id: "123",
			car_id: "testCarA",
			expected_return_date: dayjs().toDate(),
		})).rejects.toEqual(new AppError("Invalid return time!"));
	});
})

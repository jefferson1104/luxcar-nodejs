import request from "supertest";
import { Connection } from "typeorm";
import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "@shared/infra/typeorm";
import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Create Category Controller", () => {
	beforeAll(async () => {
		connection = await createConnection();
		await connection.runMigrations();

		const id = uuidV4();
		const password = await hash("admin", 8);

		await connection.query(
			`INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at)
			values('${id}', 'admin', 'admin@luxcar.com.br', '${password}', '9988551', true, 'now()')`
		);
	});

	afterAll(async () => {
		await connection.dropDatabase();
		await connection.close();
	});

	it("Should be able to create a new category", async () => {
		const responseToken = await request(app).post("/sessions").send({
			email: "admin@luxcar.com.br",
			password: "admin"
		});

		const { token } = responseToken.body;

		const response = await request(app).post("/categories").send({
			name: "Category Supertest",
			description: "Category Supertest"
		}).set({
			Authorization: `Bearer ${token}`
		});

		expect(response.status).toBe(201);
	});
})

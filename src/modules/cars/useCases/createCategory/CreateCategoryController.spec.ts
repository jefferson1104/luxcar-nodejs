import request from "supertest";

import { app } from "@shared/infra/http/app";

describe("Create Category Controller", () => {
	it("Should be able to list cars available", async () => {
		await request(app).get("/cars/available").expect(200);
	})
})

import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

const carsRoutes = Router();

const createCartController = new CreateCarController();

carsRoutes.post("/", createCartController.handle);

export { carsRoutes };

import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSepecificationController = new CreateSpecificationController();

specificationsRoutes.post("/", createSepecificationController.handle);

export { specificationsRoutes };

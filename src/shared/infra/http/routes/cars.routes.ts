import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCartController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const uploadCarImages = multer(uploadConfig);

carsRoutes.post(
	"/",
	ensureAuthenticated,
	ensureAdmin,
	createCartController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
	"/specifications/:id",
	ensureAuthenticated,
	ensureAdmin,
	createCarSpecificationController.handle
);

carsRoutes.post(
	"/images/:id",
	ensureAuthenticated,
	ensureAdmin,
	uploadCarImages.array("images"),
	uploadCarImagesController.handle
);

export { carsRoutes };

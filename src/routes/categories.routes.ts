import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesContoller } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return listCategoriesContoller.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  const { file } = request;
  console.log("CONSOLAND =>", file);
  return response.send();
});

export { categoriesRoutes };

import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ListCategoriesControlller } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = CategoriesRepository.getInstance();
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesContoller = new ListCategoriesControlller(
  listCategoriesUseCase
);

export { listCategoriesContoller };

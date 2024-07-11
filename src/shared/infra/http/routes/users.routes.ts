import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ProfilerUserController } from "@modules/accounts/useCases/profileUser/profileUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateAvatarUserController = new UpdateUserAvatarController();
const profileUserController = new ProfilerUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
	"/avatar",
	ensureAuthenticated,
	uploadAvatar.single("avatar"),
	updateAvatarUserController.handle
);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

export { usersRoutes };

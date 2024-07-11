import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
	user_id: string;
	avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository,

		@inject("StorageProvider")
		private storeProvider: IStorageProvider
	) {}

	async execute({ user_id, avatar_file }: IRequest): Promise<void> {
		const user = await this.usersRepository.findById(user_id);

		if (user.avatar) {
			await this.storeProvider.delete(user.avatar, `avatar/${user.id}`);
		}

		await this.storeProvider.save(avatar_file, `avatar/${user.id}`);

		user.avatar = avatar_file;

		await this.usersRepository.create(user);
	}
}

export { UpdateUserAvatarUseCase };

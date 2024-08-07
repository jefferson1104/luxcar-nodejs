import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class User {
	@PrimaryColumn()
	id: string;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	driver_license: string;

	@Column()
	isAdmin: boolean;

	@Column()
	avatar: string;

	@CreateDateColumn()
	created_at: Date;

	@Expose({ name: "avatar_url" })
	avatar_url(): string {
		switch (process.env.DISK) {
			case "local":
				return `${process.env.APP_API_URL}/avatar/${this.id}/${this.avatar}`;
			case "aws":
				return `${process.env.AWS_BUCKET_URL}/avatar/${this.id}/${this.avatar}`;
			default:
				return null;
		}
	}

	constructor() {
		if (!this.id) {
			this.id = uuidV4();
		}
	}
}

export { User };

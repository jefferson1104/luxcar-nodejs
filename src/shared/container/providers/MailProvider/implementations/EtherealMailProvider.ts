import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IMailProvider } from "../IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
	private client: Transporter;

	constructor() {
		nodemailer
			.createTestAccount()
			.then((account) => {
				const trasnporter = nodemailer.createTransport({
					host: account.smtp.host,
					port: account.smtp.port,
					secure: account.smtp.secure,
					auth: {
						user: account.user,
						pass: account.pass,
					},
				});

				this.client = trasnporter;
			})
			.catch((error) => console.error(error));
	}

	async sendMail(
		to: string,
		subject: string,
		variables: {
			name: string;
			link: string;
		},
		path: string
	): Promise<void> {
		const templateFileContent = fs.readFileSync(path).toString("utf-8");

		const templateParse = handlebars.compile(templateFileContent);

		const templateHTML = templateParse(variables);

		const message = await this.client.sendMail({
			to,
			from: "Luxcar <noreply@luxcar.com>",
			subject,
			html: templateHTML,
		});

		console.log("Message sent: %s", message.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
	}
}

export { EtherealMailProvider };

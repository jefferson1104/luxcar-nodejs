import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");
  const password = await hash("admin", 8);
  const id = uuidV4();

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at)
    values('${id}', 'admin', 'admin@luxcar.com', '${password}', '9988551', true, 'now()')`
  );

  await connection.close();
}

create().then(() => console.log("User admin created!"));

import { v4 as uudiV4 } from "uuid";

class Category {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uudiV4();
    }
  }
}

export { Category };

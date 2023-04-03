import { ManagerMongoDB } from "../../../db/managerMongoDB.js";

const schemaName = "users";
const userSchema = {
  first_name: {
    type: String,
    requered: true,
  },
  last_name: {
    type: String,
    requered: true,
  },
  age: {
    type: Number,
    requered: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
  },

  password: {
    type: String,
    requered: true,
  },
};

class ManagerUserMongoDB extends ManagerMongoDB {
  constructor() {
    super(process.env.MONGODBURL, schemaName, userSchema);
  }

  async getElementByEmail(email) {
    await this.setConnection();
    try {
      return await this.model.findOne({ email: email });
    } catch (error) {
      return error;
    }
  }
}

const userManager = new ManagerUserMongoDB();

export default userManager;

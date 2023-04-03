import { ManagerMongoDB } from "../../../db/managerMongoDB.js";
const schemaName = "messages";
const messageSchema = {
  user: String,
  message: String,
};

class ManagerMessageMongoDB extends ManagerMongoDB {
  constructor() {
    super(process.env.MONGODBURL, schemaName, messageSchema);
  }
}

export const messageManager = new ManagerMessageMongoDB();

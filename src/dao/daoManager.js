import userManager from "./MongoDB/models/User.js";

export const getManagerMessages = async () => {
  const modelMessage =
    process.env.SELECTEDBDD == 1
      ? await import("./MongoDB/models/Message.js")
      : await import("./Postgresql/models/Message.js");
  console.log("daomanager");
  return modelMessage;
};

export const getManagerProducts = async () => {
  const modelProduct =
    process.env.SELECTEDBDD == 1
      ? await import("./MongoDB/models/Product.js")
      : await import("./Postgresql/models/Product.js");

  return modelProduct;
};

export const getManagerUsers = async () => {
  const modelUsers =
    process.env.SELECTEDBDD == 1
      ? userManager
      : await import("./Postgresql/models/User.js");

  return modelUsers;
};

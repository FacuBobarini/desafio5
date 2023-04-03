import { getManagerUsers } from "../dao/daoManager.js";

const userManager = await getManagerUsers();
export async function createUser(req, res) {
  const { first_name, last_name, age, email, password } = req.body;
  try {
    const user = await userManager.getElementByEmail(email);
    if (user) {
      return res.status(200).json("Ya existe el email regisdtrado");
    }
    await userManager.addElements([
      { first_name, last_name, age, email, password },
    ]);

    res.redirect("/");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

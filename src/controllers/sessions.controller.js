import userManager from "../dao/MongoDB/models/User.js";

export async function getSession(req, res, next) {
  if (req.session.login) {
    res.redirect("/products");
  } else {
    res.redirect("/");
  }
}

export async function testLogin(req, res) {
  const { email, password } = req.body;
  const users = await userManager.getElementByEmail(email);

  try {
    if (email === users.email && password === users.password) {
      const { first_name, last_name, age } = users;
      req.session.login = true;
      req.session.user = { first_name, last_name, age, email, rol: "user" };
      if ("adminCoder@coder.com" === email) req.session.user.rol = "admin";
      res.cookie("userData", JSON.stringify(req.session.user), {
        maxAge: 5 * 1000,
      });
      res.redirect("/products");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export const destroySession = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

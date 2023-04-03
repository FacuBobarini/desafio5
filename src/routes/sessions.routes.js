import { Router } from "express";
import {
  getSession,
  testLogin,
  destroySession,
} from "../controllers/sessions.controller.js";

const sessionRouter = Router();

sessionRouter.get("/", getSession);
sessionRouter.get("/login", getSession);
sessionRouter.post("/testlogin", testLogin);
sessionRouter.get("/logout", destroySession);

export default sessionRouter;

import { Router } from "express";
import {
	googleAuthCallbackMiddleware,
	googleAuthMiddleware,
} from "../../passport/google-oauth/google-oauth.middleware";

const router = Router();

router.get("/login", (_, res) => {
	res.render("oauth/login");
});

router.get("/login/federated", googleAuthMiddleware);
router.get("/callback", googleAuthCallbackMiddleware, (_req, res) => {
	res.redirect("/");
});

router.get("/failure", (_req, res) => {
	res.redirect("/");
});

export default router;

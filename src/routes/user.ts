import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
	res.send(req.user);
});

router.post("/logout", (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});

export default router;

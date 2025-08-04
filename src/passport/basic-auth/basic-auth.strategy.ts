import passport from "passport";

import { BasicStrategy } from "passport-http";
import { BASIC_AUTH_PASS, BASIC_AUTH_USER } from "../../config/passport";

passport.use(
	new BasicStrategy((username, password, done) => {
		const valid = username === BASIC_AUTH_USER && password === BASIC_AUTH_PASS;

		if (!valid) {
			done(null, false);
		}
		done(null, true);
	}),
);

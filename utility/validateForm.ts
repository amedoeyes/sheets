import { z } from "zod";

export default function validateForm<
	S,
	F extends {
		state: {};
		setMessageOf: (key: string, message: string) => void;
	}
>(schema: z.ZodType<S, any, any>, form: F) {
	const validate = schema.safeParse(form.state);

	if (!validate.success) {
		const errors = validate.error.flatten().fieldErrors;

		for (let error in errors) form.setMessageOf(error, errors[error]![0]);
	}

	return validate;
}

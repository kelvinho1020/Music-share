import { Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure } from "vee-validate";
import { required, min, max, alpha_spaces as alphaSpaces, email, confirmed, min_value as minVal, max_value as maxVal} from "@vee-validate/rules";

export default {
	install(app) {
		app.component("VeeForm", VeeForm);
		app.component("VeeField", VeeField);
		app.component("ErrorMessage", ErrorMessage);

		defineRule("required", required);
		defineRule("tos", required);
		defineRule("min", min);
		defineRule("max", max);
		defineRule("alpha_spaces", alphaSpaces);
		defineRule("email", email);
		defineRule("min_value", minVal);
		defineRule("max_value", maxVal);
		defineRule("required_song_title", required)
		defineRule("passwords_mismatch", confirmed);

		configure({
			generateMessage: ctx => {
				const messages = {
					required: `${ctx.field} is required`,
					min: `${ctx.field} is too short`,
					max: `${ctx.field} is too long`,
					alpha_spaces: `${ctx.field} may only contain alphabetical characters`,
					min_value: `${ctx.field} is too low`,
					max_value: `${ctx.field} is too high`,
					passwords_mismatch: "The passwords don't match",
					tos: `You must accept the Terms of Service`,
					required_song_title: `You need to enter a song name`
				};

				const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid`;
				return message;
			},
			validateOnBlur: true,
			validateOnChange: true,
			validateOnInput: false,
			validateOnModelUpdate: true,
		});
	},
};

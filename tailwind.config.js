module.exports = {
	purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
	darkMode: "class",
	theme: {
		extend: {
			spacing: {
				120: "30rem",
				150: "37.5rem",
			},
		},
	},
	variants: {
		extend: {
			textOpacity: ["dark"],
		},
		transitionDuration: ["hover", "focus"],
		width: ["responsive", "hover", "focus"],
		transitionProperty: ["responsive", "motion-safe", "motion-reduce", "hover", "focus"],
	},
	plugins: [],
};

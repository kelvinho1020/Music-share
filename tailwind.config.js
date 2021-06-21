module.exports = {
	purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
	darkMode: false,
	theme: {
		extend: {},
	},
	variants: {
		transitionDuration: ["hover", "focus"],
		width: ["responsive", "hover", "focus"],
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce',"hover", "focus"]
	},
	plugins: [],
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "btn-up": "0 3px 0 0 (100,100,100,1)",
				"btn-up-sm": "0 2px 0 0 (100,100,100,1)",
        "btn-down": "0 1px 0 0 (100,100,100,1)",
        input: "0 -1px 0 0 rgba(0, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};

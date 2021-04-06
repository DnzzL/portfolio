const path = require("path");
const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "jsconfig",
      },
    },
  ],
  webpack: {
    alias: {
      "@images": path.resolve(__dirname, "src/assets/images/"),
      "@blogs": path.resolve(__dirname, "src/assets/blogs/"),
    },
  },
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};

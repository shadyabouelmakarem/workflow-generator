module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/no-babel",
  transform: {
    ".*\\.(vue)$": "@vue/vue3-jest",
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "json", "vue", "ts"],
};

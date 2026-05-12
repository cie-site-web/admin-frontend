const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./", // chemin racine de ton projet
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom", // pour React
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // pour les imports absolus
  },
};

module.exports = createJestConfig(customJestConfig);
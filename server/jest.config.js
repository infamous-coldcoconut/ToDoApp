export default {
  transform: {
    "^.+\\.js$": "babel-jest", // Use babel-jest to handle the transformation
  },
  testEnvironment: "node", // Ensure you're using the node environment for your server tests
  preset: "jest-preset-node", // Use the Jest preset for Node.js, suitable for ES modules
};

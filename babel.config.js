module.exports = {
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      { 
        legacy: true,
        loose: true
      },
    ],
    "@babel/plugin-proposal-class-properties"
],
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['@stsiarzhanau/nextjs-typescript/core'],
  ignorePatterns: ['dist', '*.cjs'],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
  parserOptions: {
    project: ['./tsconfig.app.json', './tsconfig.node.json'],
  },
};

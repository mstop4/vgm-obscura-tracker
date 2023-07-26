module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => [
    `npm run prettier`,
    'npm run check-ts',
    `npm run lint`,
    // `npm run test`
  ],

  '**/*.scss': () => [
    `npm run lint`,
    `npm run prettier`,
  ],
};
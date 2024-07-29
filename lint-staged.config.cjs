module.exports = {
  '*.ts?(x)': ['eslint --fix', 'prettier --write'],
  '!*.ts?(x)': 'prettier --ignore-unknown --write',
};

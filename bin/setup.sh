cp ./bin/.git-hooks/pre-commit .git/hooks
chmod u+x .git/hooks/pre-commit

npm install

if [ -d "test" ]
then
  npm run test
  npm run coverage
fi

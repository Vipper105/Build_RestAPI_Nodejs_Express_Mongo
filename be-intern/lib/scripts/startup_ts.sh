 # auto find and install
 npm install
 
 npm init -y

# -- Instal typescript --
 npm install -g typescript ts-node

# -- Install all the dependencies --
# After finish this you can see ‘package-lock.json’ file created and ‘node_modules’ has been imported.
 npm install --save @types/express express body-parser mongoose   nodemon

 # Whenever we run typescript compiler ‘tsc’ all the typescript files inside ‘lib’ folder will convert into javascript and save inside ‘dist’ folder
 tsc

# Set the scripts to run API
# Inside ‘package.json’ file update main file as follow.
# "main": "./dist/server.js"

# So, for the development, we can run a test server by running following on your terminal
npm run test / npm run dev
 # For the production
npm run prod

# To terminate the process, press
ctrl + c

# use crypto to create a key for authentication
node -e "console.log(require('crypto').randomBytes(20).toString('hex'))"
# GET request
https://127.0.0.1:3000?key=78942ef2c1c98bf10fca09c808d718fa3734703e

# run test mocha chai
npm test

# install typescript
npm install typescript --dev

# format code with prettier
npx prettier --write

# install joi
npm install @types/joi --save-dev

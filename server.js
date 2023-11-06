const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // this will read confiqs from the file and save that into this file

const app = require('./app');

//console.log(app.get('env')); //this will show an environment;

// console.log(process.env); //to see all variables;

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//environment variables should be out of the express scope'
//by default node set up the environment to the development environment;

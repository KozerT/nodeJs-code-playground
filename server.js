const app = require('./app');

// dotenv.confiq({path: './config.env'})

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

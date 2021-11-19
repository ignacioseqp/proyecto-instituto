const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
const puerto = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(
    DB,
    // process.env.DATABASE_LOCAL,
    {
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connection successful!');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(puerto, () => {
  console.log(`Escuchando en 127.0.0.1:${puerto}`);
});

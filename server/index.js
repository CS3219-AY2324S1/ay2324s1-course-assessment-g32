const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

MONGOCLIENT = 'mongodb+srv://root:password12345678@cluster0.lfbgr2v.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(MONGOCLIENT)
  .then(() => {
    app.listen(PORT);
    console.log(`API is listening on port ${PORT}`);
  })
  .catch(err => console.log(err));

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./Config/DatabaseDB');

const userRoutes = require('./routes/user');
const chauffeurRoutes = require('./routes/chauffeur');
const userCommentaires = require('./routes/commentaire');

const app = express();

app.use(cors());
app.use(express.json());
// Routes
app.use('/api/users', userRoutes)
app.use('/api/chauffeurs', chauffeurRoutes)
app.use('/api/commentaires', userCommentaires)

const port = 3000

// Middleware
app.use(bodyParser.json());



sequelize.sync().then(() => {
    app.listen(3000, () => {
      console.log(`Server is running on port ${port}`);
    });
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });


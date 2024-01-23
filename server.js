const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars'); // Correct import
const routes = require('./controls');
const sequelize = require('./config/CONN');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionTimeout = require('./utils/sessionTimeout'); // Import sessionTimeout

const app = express();
const PORT = process.env.PORT || 3009;

const hbs = exphbs.create({});
const sesh = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: 900000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 900000,
    expiration: 900000,
  }),
};

app.use(session(sesh));
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/', routes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'main')));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT: ${PORT}`));
});
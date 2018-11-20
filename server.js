const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

require('./server/models').connect(config.dbUri);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authorization checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const toolRoutes = require('./server/routes/tool');
app.use('/auth', authRoutes);
app.use('/tool', toolRoutes);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Listening on port ${port}`));
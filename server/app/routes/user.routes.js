const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/top', controller.top);

  app.post('/api/submit', [authJwt.verifyToken], controller.submitResult);

  app.get('/api/userdata', controller.userData);
};

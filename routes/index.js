const Router = require('koa-router');
const router = new Router();
const {
    CompanyController,
    JobController,
    ApplicationController,
    UserController
} = require('../controllers');
const isAuthenticated = require('../polices/isAuthenticated');

//define all your routes
router.post('/companies', isAuthenticated, CompanyController.create);
router.get('/companies', isAuthenticated, CompanyController.find);
router.get('/companies/:id', isAuthenticated, CompanyController.findOne);
router.delete('/companies/:id', isAuthenticated, CompanyController.destroy);
router.put('/companies/:id', isAuthenticated, CompanyController.update);

//Jobs route
router.post('/jobs', isAuthenticated, JobController.create);
router.get('/jobs', isAuthenticated, JobController.find);

//Application route
router.post('/applications', isAuthenticated, ApplicationController.create);

//User routes
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

module.exports = router;
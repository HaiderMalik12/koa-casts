const Router = require('koa-router');
const router = new Router();
const {CompanyController, JobController} = require('../controllers');

//define all your routes
router.post('/companies', CompanyController.create);
router.get('/companies', CompanyController.find);
router.get('/companies/:id', CompanyController.findOne);
router.delete('/companies/:id', CompanyController.destroy);
router.put('/companies/:id', CompanyController.update);

//Jobs route
router.post('/jobs', JobController.create);

module.exports = router;
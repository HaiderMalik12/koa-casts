const Router = require('koa-router');
const router = new Router();
const {CompanyController} = require('../controllers');

//define all your routes
router.post('/companies', CompanyController.create);
router.get('/companies', CompanyController.find);
router.get('/companies/:id', CompanyController.findOne);
router.delete('/companies/:id', CompanyController.destroy);

module.exports = router;
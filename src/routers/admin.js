const router = require('express').Router();
const knex = require('../database/index');
const auth = require('../middlewares/auth')

router.get('/', auth, (req,res) => {
    require('../controllers/admin').index(req,res,knex)
})
router.get('/edit/:id', auth, (req,res) => {
    require('../controllers/admin').edit(req,res,knex)
})
router.get('/delete/:id', auth, (req,res) => {
    require('../controllers/admin').delete(req,res,knex)
})
router.get('/orders', auth, (req,res) => {
    require('../controllers/admin').orders(req,res,knex)
})
router.get('/orders/delete/:id', auth, (req,res) => {
    require('../controllers/admin').orders_delete(req,res,knex)
})
router.get('/new_category', auth, (req,res) => {
    require('../controllers/admin').new_category(req,res)
})
router.get('/new_food', auth, (req,res) => {
    require('../controllers/admin').new_food(req,res,knex)
})



router.post('/edit', auth, (req,res) => {
    require('../controllers/admin').POST_edit(req,res,knex)
})
router.post('/new_category', auth, (req,res) => {
    require('../controllers/admin').POST_new_category(req,res,knex)
})
router.post('/new_food', auth, (req,res) => {
    require('../controllers/admin').POST_new_food(req,res,knex)
})

module.exports = router;
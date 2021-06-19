const router = require('express').Router();
const knex = require('../database/index');

router.get('/', (req,res) => {
    require('../controllers/admin').index(req,res,knex)
})
router.get('/edit/:id', (req,res) => {
    require('../controllers/admin').edit(req,res,knex)
})
router.get('/delete/:id', (req,res) => {
    require('../controllers/admin').delete(req,res,knex)
})
router.get('/orders', (req,res) => {
    require('../controllers/admin').orders(req,res,knex)
})
router.get('/orders/delete/:id', (req,res) => {
    require('../controllers/admin').orders_delete(req,res,knex)
})
router.get('/new_category', (req,res) => {
    require('../controllers/admin').new_category(req,res)
})
router.get('/new_food', (req,res) => {
    require('../controllers/admin').new_food(req,res,knex)
})



router.post('/edit', (req,res) => {
    require('../controllers/admin').POST_edit(req,res,knex)
})
router.post('/new_category', (req,res) => {
    require('../controllers/admin').POST_new_category(req,res,knex)
})
router.post('/new_food', (req,res) => {
    require('../controllers/admin').POST_new_food(req,res,knex)
})

module.exports = router;

// Nao esqueca da autenticacao, controle o acesso as rotas do CRUD
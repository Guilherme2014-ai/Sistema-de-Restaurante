const router = require('express').Router()
const knex = require('../database/index')

router.get('/', async (req,res) => {
    require('../controllers/public').index(req,res,knex)
})
router.get('/cardapio/:nome', async (req,res) => {
    require('../controllers/public').food_id(req,res,knex)
})
router.get('/shoppingcart', async (req,res) => {
    require('../controllers/public').shoppingcart(req,res,knex)
})
router.get('/order_request/:name_user/:preference/:tel_number/:address', async (req,res) => {
    require('../controllers/public').order_request(req,res,knex)
})


router.post('/shoppingcart', async (req,res) => {
    require('../controllers/public').POST_shoppingcart(req,res)
})



module.exports = router
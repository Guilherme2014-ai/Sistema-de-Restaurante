const router = require('express').Router()
const knex = require('../database/index')

router.get('/', async (req,res) => {
    require('../controllers/public').index(req,res,knex)
})

router.get('/cardapio/:nome', async (req,res) => {
    require('../controllers/public').food_id(req,res,knex)
})



module.exports = router
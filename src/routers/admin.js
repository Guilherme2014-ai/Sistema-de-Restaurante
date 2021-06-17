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


router.post('/edit', (req,res) => {
    require('../controllers/admin').POST_edit(req,res,knex)
})

module.exports = router;

// Nao esqueca da autenticacao, controle o acesso as rotas do CRUD
const router = require('express').Router()
const knex = require('../database/index')

router.get('/', async (req,res) => {
    try{

        const data = await knex
                .select("*")
                .innerJoin('categorias','categorias.id','cardapio.category_id')
                .table("cardapio")


        res.render('public/index',{ data })

    } catch(err){console.error(err)}
})

router.get('/cardapio/:nome', async (req,res) => {
    try{
        const nome = req.params.nome;

        if(nome == undefined || nome == null){
            res.redirect('/')
            return
        }

        const data = await knex
                    .select("*")
                    .where('categoria', nome)
                    .innerJoin('cardapio','categorias.id','cardapio.category_id')
                    .table("categorias")

        res.render('public/food_id',{ data })
    } catch(err){console.error(err)}
})

module.exports = router
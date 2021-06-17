module.exports.index = async (req,res,knex) => {
    try{

        const categories = await knex.select("*").table("categorias")
        const data = await knex
                .select("*")
                .innerJoin('categorias','categorias.id','cardapio.category_id')
                .table("cardapio")


        res.render('public/index',{ data, categories})

    } catch(err){console.error(err)}
}

module.exports.food_id = async (req,res,knex) => {
    try{
        const nome = req.params.nome;

        if(nome == undefined || nome == null){
            res.redirect('/')
            return
        }

        const categories = await knex.select("*").table("categorias")
        const data = await knex
                    .select("*")
                    .where('categoria', nome)
                    .innerJoin('cardapio','categorias.id','cardapio.category_id')
                    .table("categorias")

        res.render('public/food_id',{ data, categories })
    } catch(err){console.error(err)}
}

/*
To Do...

- The Client's Order 
- Log in
*/
module.exports.index = async (req,res,knex) => {
    try{

        const data = await knex.select("*").table('cardapio')
        res.render('admin/index',{ data, message: req.flash("message") })

    } catch(err){console.error(err)}
}
module.exports.edit = async (req,res,knex) => {
    try{

        const id = req.params.id;

        if(isNaN(id)){ return res.json({ error: "Insira um id valido !" }) }

        const food = await knex.select("*").where('id', id).table("cardapio")

        if(food == null || food.length == 0 || food == undefined){ return res.json({ error: "Comida Nao encontrada !" }) }

        const categories = await knex.select("*").table("categorias")
        
        res.render('admin/edit',{ id: req.params.id, food: food[0], categories })

    } catch(err){console.error(err)}
}
module.exports.delete = (req,res,knex) => {
    const id = req.params.id

    knex
    .where('id', id)
    .delete()
    .table('cardapio') // NUNCA ESQUECA DISSO !!
    .then(result => {res.redirect('/admin')})
    .catch(err => {console.error(err)})
}
module.exports.orders = async (req,res,knex) => {
    try{
        const data = await knex.select("*").table("pedidos")
        res.render('admin/orders', { data })
    } catch(err){console.error(err)}
}
module.exports.orders_delete = async (req,res,knex) => {
    try{

        const { id } = req.params

        await knex
            .where('id', id)
            .delete()
            .table("pedidos")

        res.redirect('/admin/orders')

    } catch(err){console.error(err)}
}
module.exports.new_category = (req,res) => {
    res.render('admin/new_category')
}
module.exports.new_food = async (req,res,knex) => {
    try{

        const categories = await knex.select("*").table("categorias")

        res.render('admin/new_food', { categories })

    } catch(err){console.error(err)}
}
// cada usuario pode ter vairios pedidos, dps arrume isso

module.exports.POST_edit = async (req,res,knex) => {
    try{

        let { id,name,price,info,img,category_id } = req.body;

        if(isNaN(category_id)){
            res.json({ error: 'Escolha uma Categoria Valida' })
            return
        }

        price = price.replace(',','.')

        await knex.transaction(async trans => {
            const update = { name,price,info,img }
            await knex.where('id',id).update(update).table('cardapio')
        })

        res.redirect('/admin')

    } catch(err){
        console.error(err)
        res.json({ error: err })
    }
}
module.exports.POST_new_category = async (req,res,knex) => {
    try{

        const { name } = req.body;
        const categoria = String(name).toLowerCase();
        
        await knex.transaction(async trans => {
            await knex
            .insert({ categoria })
            .table('categorias')
        })

        req.flash("message", 'Categoria Criada Com Sucesso !')
        res.redirect('/admin')

    } catch(err){
        console.error(err)
        res.json({ error: err })
    }
}
module.exports.POST_new_food = async (req,res,knex) => {
    try{

        const { name,info,img,price,category_id } = req.body;

        const data = { name,info,img,price,category_id }
        console.log(data)

        await knex.transaction(async trans => {
            await knex.
            insert(data)
            .table('cardapio')
            //nao necessita mas estou usando para trienar
        })

        req.flash("message", 'Comida adicionada ao Cardapio !')
        res.redirect('/admin')

    } catch(err){
        console.error(err)
        res.json({ error: err })
    }
}
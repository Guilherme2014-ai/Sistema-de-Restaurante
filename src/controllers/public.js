module.exports.index = async (req,res,knex) => {
    try{

        if(req.session.user){}else{
            req.session.user = {
                shoppingcart: []
            }
        }

        const categories = await knex.select("*").table("categorias")
        const data = await knex
                .select("*")
                .innerJoin('categorias','categorias.id','cardapio.category_id')
                .table("cardapio")

        res.render('public/index',{ data, categories, message: req.flash("message") })

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

        res.render('public/food_id.ejs',{ data, categories })
    } catch(err){console.error(err)}
}
module.exports.shoppingcart = async (req,res,knex) => {
    try{

        const categories = await knex.select("*").table("categorias")
        res.render('public/shoppingCart',{ req, categories })

    } catch(err){console.error(err)}
}
module.exports.order_request = async (req,res,knex,flash) => {
    try{

        const order = req.session.user["shoppingcart"];
        const { name_user,preference,tel_number,address } = req.params;


        order.forEach(async function(elem){
            const data = {
                name: elem["name"],
                name_user,
                preference,
                tel_number,
                address,
                img: elem["img"]
            }

            await knex
            .insert(data)
            .table('pedidos')
        })
        
        req.flash("message",'Pedido Feito com Sucesso, Agora So aguardar...')
        res.redirect('/')

    } catch(err){console.error(err)}
}


module.exports.POST_shoppingcart = (req,res) => {
    const { name,price,img } = req.body;
    const obj = { name,price,img }

    req.session.user["shoppingcart"].push(obj)
    res.redirect('/')
}

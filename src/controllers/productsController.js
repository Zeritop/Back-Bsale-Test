import connection from '../database.js';
const productCtrl = {}

productCtrl.getProducts = (req, res) => {

    let $query = ''
    let paginate = ''
    let countPaginate = 0
    $query = 'SELECT * from product LIMIT 10';
    paginate = 'SELECT count(*) as paginacion from product'

    connection.getConnection(function(err, connection){
        if(!err){
            connection.query(paginate, function(err, data){
                connection.release();
                if(err){
                    console.log("Ha ocurrido un error con la consulta", err);
                    return;
                }
                if(data.length > 0){
                    countPaginate = data        
                }else{
                    return res.send('Sin resultados')
                }
            })

        }else{
            console.log(err)
        }
    })

    connection.getConnection(function(err, connection){
        if(!err){
            connection.query($query, function(err, data){
                connection.release();
                if(err){
                    console.log("Ha ocurrido un error con la consulta", err);
                    return;
                }
                if(data.length > 0){
                    return res.json({
                        data,
                        paginate: countPaginate
                    })
        
                }else{
                    return res.send('Sin resultados')
                }
            })

        }else{
            console.log(err)
        }
    }) 
}

productCtrl.getCategory = (req, res) => {
    const $query = 'SELECT * from category';

    connection.getConnection(function(err, connection){
        if(!err){
            connection.query($query, function(err, data){
                connection.release();
                if(err){
                    console.log("Ha ocurrido un error con la consulta", err);
                    return;
                }
                if(data.length > 0){
                    return res.json(data)
        
                }else{
                    return res.send('Sin resultados')
                }
            })

        }else{
            console.log(err)
        }
    })
}

productCtrl.getProductByCategory = (req, res) => {
    let $query = ''
    let paginate = ''
    let countPaginate = 0
    let { id_category, offset } = req.body
    if(offset === null){
        offset = 0
    }

    if(id_category === 0){
        $query = `SELECT * FROM product LIMIT ${offset},10`
        paginate = 'SELECT count(*) as paginacion FROM product' 
    }else{
        $query = `SELECT * FROM product WHERE category = ${id_category} LIMIT ${offset},10`
        paginate = `SELECT count(*) as paginacion FROM product WHERE category = ${id_category}`
    }

    connection.getConnection(function(err, connection){
        if(!err){
            connection.query(paginate, function(err, data){
                connection.release();
                if(err){
                    console.log("Ha ocurrido un error con la consulta", err);
                    return;
                }
                if(data.length > 0){
                    countPaginate = data        
                }else{
                    return res.send('Sin resultados')
                }
            })

        }else{
            console.log(err)
        }
    })
    

    connection.getConnection(function(err, connection){
        if(!err){
            connection.query($query, function(err, data){
                connection.release();
                if(err){
                    console.log("Ha ocurrido un error con la consulta", err);
                    return;
                }
                if(data.length > 0){
                    return res.json({
                        data,
                        paginate: countPaginate
                    })
        
                }else{
                    return res.send('Sin resultados')
                }
            })

        }else{
            console.log(err)
        }
    })
}

productCtrl.getProductsByInput = (req, res) => {

    const { inputSearch } = req.body;
    const lower = inputSearch.toLowerCase();
    let $query = ''
    if(inputSearch !== ''){
        $query = `SELECT * FROM product WHERE name LIKE "%${lower}%"`;
        connection.getConnection(function(err, connection){
            if(!err){
                connection.query($query, function(err, data){
                    connection.release();
                    if(err){
                        console.log("Ha ocurrido un error con la consulta", err);
                        return;
                    }
                    if(data.length > 0){
                        return res.json(data)
            
                    }else{
                        return res.send('Sin resultados')
                    }
                })
    
            }else{
                console.log(err)
            }
        })
    }else{
        return
    }

}

export default productCtrl
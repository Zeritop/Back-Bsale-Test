import connection from '../database.js';
const productCtrl = {}

//Obtener los productos
productCtrl.getProducts = (req, res) => {

    let $query = ''
    let paginate = ''
    let countPaginate = 0
    $query = 'SELECT * from product LIMIT 10'; //query obtener productos con limite de 10 productos
    paginate = 'SELECT count(*) as paginacion from product' //obtener cuenta de todos los productos

    //se realiza una coneccion
    connection.getConnection(function(err, connection){
        if(!err){
            //si no hay error se ejecuta la query paginate
            connection.query(paginate, function(err, data){
                connection.release();
                if(err){
                    console.log("Ha ocurrido un error con la consulta", err);
                    return;
                }
                if(data.length > 0){
                    //si hay datos se obtiene la cuenta
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
            // se realiza la query $query
            connection.query($query, function(err, data){
                connection.release();
                if(err){
                    console.log("Ha ocurrido un error con la consulta", err);
                    return;
                }
                if(data.length > 0){
                    //si hay datos se devuelve en formato json
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

//funcio obtener categorias
productCtrl.getCategory = (req, res) => {
    const $query = 'SELECT * from category'; //query para obtener las categorias
    
    //se realiza una coneccion
    connection.getConnection(function(err, connection){
        if(!err){
            // si no hay error se ejecuta la query $query
            connection.query($query, function(err, data){
                connection.release();
                if(err){
                    console.log("Ha ocurrido un error con la consulta", err);
                    return;
                }
                if(data.length > 0){
                    // si hay datos se devuelven en formato json
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

//se obtienen los productos por categoria
productCtrl.getProductByCategory = (req, res) => {
    let $query = ''
    let paginate = ''
    let countPaginate = 0
    let { id_category, offset } = req.body // se obtienen los datos enviados por el cliente
    if(offset === null){
        offset = 0
    }

    if(id_category === 0){ // si el 'id' es cero se busca los primeros elementos
        $query = `SELECT * FROM product LIMIT ${offset},10`
        paginate = 'SELECT count(*) as paginacion FROM product' 
    }else{
        //sino se busca dependiendo del valor
        $query = `SELECT * FROM product WHERE category = ${id_category} LIMIT ${offset},10`
        paginate = `SELECT count(*) as paginacion FROM product WHERE category = ${id_category}`
    }

    //se realiza una connecion
    connection.getConnection(function(err, connection){
        if(!err){
            //si no hay error se ejecuta la query paginate
            connection.query(paginate, function(err, data){
                connection.release();
                if(err){
                    console.log("Ha ocurrido un error con la consulta", err);
                    return;
                }
                if(data.length > 0){
                    //si hay datos se almacenan en la variable
                    countPaginate = data        
                }else{
                    return res.send('Sin resultados')
                }
            })

        }else{
            console.log(err)
        }
    })
    
    // se realiza una conneccion
    connection.getConnection(function(err, connection){
        if(!err){
            //si no hay error se ejecuta la query $query
            connection.query($query, function(err, data){
                connection.release();
                if(err){
                    console.log("Ha ocurrido un error con la consulta", err);
                    return;
                }
                if(data.length > 0){
                    // se devuelven los datos en formato json
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

//obtener productos por barra de busqueda
productCtrl.getProductsByInput = (req, res) => {

    const { inputSearch } = req.body;
    const lower = inputSearch.toLowerCase();// el valor se pasa a minusculas
    let $query = ''
    if(inputSearch !== ''){
        $query = `SELECT * FROM product WHERE name LIKE "%${lower}%"`; //se busca en la bd dependiendo del valor ingresado

        // se realiza una coneccion
        connection.getConnection(function(err, connection){
            if(!err){
                //si no hay error se ejecuta la query $query
                connection.query($query, function(err, data){
                    connection.release();
                    if(err){
                        console.log("Ha ocurrido un error con la consulta", err);
                        return;
                    }
                    if(data.length > 0){
                        // si hay datos se devuelve en formato json
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
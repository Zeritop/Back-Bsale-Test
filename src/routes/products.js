import router from 'express';
import productCtrl from '../controllers/productsController.js';
const rutas = router.Router();

const { getProducts, getCategory, getProductByCategory, getProductsByInput } = productCtrl

//Rutas para la api
rutas.get('/get-products', getProducts);

rutas.get('/get-category', getCategory);

rutas.post('/get-product-by-category', getProductByCategory)

rutas.post('/get-product-by-input', getProductsByInput)


export default rutas;
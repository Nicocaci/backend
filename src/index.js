const express = require('express');
const productRouter = require('./routes/products.router.js');
const cartRouter = require('./routes/carts.router.js');
const viewsRouter = require('./routes/views.router.js');
const app = express();
const PUERTO = 8080;
const { Server } = require('socket.io');
const socket = require('socket.io');
const ProductManager = require("./managers/db/product-managers-db.js");
const manager = new ProductManager(); 
const path = require('path');
require("./database.js"); 
const userRouter = require('./routes/user.router.js');
const cookieParser = require('cookie-parser');
const initializePassport = require('./config/passport.config.js');
const passport = require('passport')





// Importamos express Handle bars

const exphbs = require("express-handlebars")

// Configuramos express-handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public")); 
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
initializePassport(); 
app.use(passport.initialize()); 

// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', userRouter);
app.use('/', viewsRouter);

const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
});

// const io = new Server(httpServer);

// io.on("connection", async (socket) =>{
//     console.log("un cliente se conecto");
    
    
//     socket.emit("productos", await manager.getProducts());

//     socket.on("eliminarProducto", async (id) =>{
//         await manager.deleteProduct(id);
//         io.sockets.emit("productos", await manager.getProducts());  
//     })

//     socket.on("addProduct", async (product) => {
//         // Verificación básica de campos necesarios
//         if (!product || typeof product !== 'object') {
//             console.error('Invalid product data');
//             return;
//         }
    
//         // Validar que todos los campos requeridos están presentes y no están vacíos
//         const { title, description, price,thumbnail, stock} = product;
    
//         if (!title || typeof title !== 'string' || title.trim() === '') {
//             console.error('Product title is required and must be a non-empty string');
//             return;
//         }
    
//         if (!description || typeof description !== 'string' || description.trim() === '') {
//             console.error('Product description is required and must be a non-empty string');
//             return;
//         }
    
    
//         if (isNaN(price) || price <= 0) {
//             console.error('Product price is required and must be a positive number');
//             return;
//         }
    
//         if (isNaN(stock) || stock < 0) {
//             console.error('Product stock is required and must be a non-negative integer');
//             return;
//         }
//         if (typeof thumbnail !== 'string') {
//             console.error('Product thumbnail must be a string');
//             return;
//         }
    
    
//         // Agregar el producto
//         try {
//             await manager.addProduct(product);
//             io.sockets.emit("products", await manager.getProducts());
//         } catch (error) {
//             console.error('Error adding product:', error);
//         }
//     });
// })

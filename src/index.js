import express from 'express';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import ProductManager from './managers/db/product-managers-db.js';
import path from 'path';
import { fileURLToPath } from 'url'; // Necesario para manejar __dirname en ES Modules
import './database.js'; 
import userRouter from './routes/user.router.js';
import cookieParser from 'cookie-parser';
import initializePassport from './config/passport.config.js';
import passport from 'passport';

const app = express();
const PUERTO = 8080;
const manager = new ProductManager();


// Importamos express Handle bars
import { engine as handlebarsEngine } from "express-handlebars";
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

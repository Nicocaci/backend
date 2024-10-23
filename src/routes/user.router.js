const express = require('express');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/user.model.js');
const { createHash, isValidPassword } = require('../utilis/util');
const router = express.Router();
const passport = require('passport')

// REGISTRO
router.post("/registro", async (req, res) => {
    console.log(req.body);
    const { first_name, last_name, email, password, age,rol} = req.body;

    // Validación de campos
    if (!first_name || !last_name || !email || !password || !age ) {
        return res.status(400).send("Todos los campos son requeridos.");
    }

    try {
        const existeUsuario = await UserModel.findOne({ email });

        if (existeUsuario) {
            return res.status(400).send("El email ingresado ya fue utilizado, intente nuevamente con otro.");
        }

        // Si el email no existe, procedemos a guardar el nuevo usuario
        const nuevoUsuario = new UserModel({
            first_name,
            last_name,
            email,
            password: createHash(password),
            age,
            rol
        });

        await nuevoUsuario.save();

        const token = jwt.sign({ usuario: nuevoUsuario.email }, "lajuntavino", { expiresIn: "1h" });

        // Enviamos el token con la cookie
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000,
            httpOnly: true,
            secure: false, // Cambia a true si usas HTTPS
            sameSite: 'Strict'
        });

        res.status(201).json({
            message: "Usuario creado correctamente",
            token: token
        });

    } catch (error) {
        console.error("Error en el registro:", error); // Loguear el error en la consola
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
});


// LOGIN
router.post("/login", async (req,res) =>{
    const {email,password} = req.body;
    try {
        const usuarioEncontrado = await UserModel.findOne({email});
        if (!usuarioEncontrado){
            return res.status(401).send("Email no encontrado, registrarse primero");
        }
        if(!isValidPassword(password,usuarioEncontrado)){
            return res.status(401).send("Contraseña incorecta");
        }

        // GENERAMOS EL TOKEN JWT
        const token = jwt.sign({usuario:usuarioEncontrado.email}, "lajuntavino", {expiresIn:"1h"});

        // ENVIAMOS EL TOKEN MEDIANTE LA COOKIE
        res.cookie("coderCookieToken", token, {
            maxAge:3600000,
            httpOnly:true
        })

        res.redirect("/api/sessions/current")
    } catch (error) {
        res.status(500).send("Error interno del servidor"); 
    }
})



// LOGOUT
router.post("/logout",(req,res) =>{
    res.clearCookie("coderCookieToken");
    res.redirect("/login")
})

// CURRENT
    router.get("/current", passport.authenticate("current", {session:false}), (req,res)=>{
        res.render("index", {usuario:req.user.email})
    })

// ADMIN
router.get("/admin", passport.authenticate("current", {session:false}), (req, res) => {
    if(req.user.rol !== "admin") {
        return res.status(403).send("Acceso denegado!"); 
    }

    //Si el usuario es administrador, mostrar la vista correspondiente: 
    res.render("admin"); 
})

module.exports = router
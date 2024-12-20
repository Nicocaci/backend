import UserService from "../services/user.service.js"
import jwt from "jsonwebtoken";
import UserDto from "../dto/user.dto.js";

class UserController {
    async register(req,res){
    const {first_name, last_name, email, age, password} = req.body;
    try {
        const nuevoUsuario = await UserService.registerUser({first_name,last_name,email,age,password});

        const token = jwt.sign(
            {
                usuario: `${nuevoUsuario.first_name} ${nuevoUsuario.last_name}`,
                email: nuevoUsuario.email,
                role: nuevoUsuario.role,
            },
            "coderhouse",
            {expiresIn: "1h"}
        );

        res.cookie("coderCookieToken", token, {maxAge: 3600000, httpOnly: true});
        res.redirect("/api/sessions/current");
    } catch (error) {
        console.error("cagamos", error);
        res.status(500).send("Error del servidor");
    }
}

    async login(req,res){
        const {email, password} = req.body;
        try {
            const user = await UserService.loginUser(email,password);

            const token = jwt.sign(
                {
                    usuario: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    role:user.role,
                },
                "coderhouse",
                {expiresIn: "1h"}
            );

            res.cookie("coderCookieToken", token, { maxAge: 3600000, httpOnly: true});
            res.redirect("/api/sessions/current");

        } catch (error) {
            res.status(500).send("Error del server");
        }
    }

    async current(req,res) {
        if(req.user){
            const user = req.user;
            const userDto = new UserDto(user);
            res.render("home", { user:userDto});
        }else{
            res.send("No autorizado")
        }
    }

    async logout(req,res) {
        res.clearCookie("coderCookieToken");
        res.redirect("/login");
    }
}

export default new UserController();
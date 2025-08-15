const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async(req, res = response) => {

    const { email, password} = req.body;

    try{

        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }

            usuario = new Usuario(req.body);

            //encriptar contraseña
            const salt = bcrypt.genSaltSync();
            usuario.password = bcrypt.hashSync(password, salt);

            await usuario.save();

            // generar JWT
            const token = await generarJWT(usuario.id, usuario.name);

            res.status(201).json({
                ok:true,
                uid: usuario.id,
                name: usuario.name,
                token
            })
        
    } 
    catch (error) {

        console.log('Error creating user:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error creating user'
        });

    }
}


const loginUsuario = async(req, res = response) => {

    const {email, password} = req.body;
    const clientIP = req.ip || req.connection.remoteAddress;

    try {
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            console.warn(`Login fallido para email inexistente: ${email} desde IP: ${clientIP}`);
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o contraseña no son correctos'
            });
        }
        
        // Verificar si está bloqueado
        if (usuario.isLocked) {
            console.warn(`Intento de login en cuenta bloqueada: ${email} desde IP: ${clientIP}`);
            return res.status(423).json({
                ok: false,
                msg: 'Cuenta temporalmente bloqueada por múltiples intentos fallidos'
            });
        }


        // confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            await usuario.incLoginAttempts();
            console.warn(`Password incorrecto para: ${email} desde IP: ${clientIP}`);

            return res.status(400).json({
                ok: false,
                msg: 'El usuario o contraseña no son correctos'
            });
        }

        // Reset intentos exitosos
        if (usuario.loginAttempts > 0) {
            await usuario.updateOne({
                $unset: { loginAttempts: 1, lockUntil: 1 }
            });
        }

         // generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        console.info(`Login exitoso para: ${email} desde IP: ${clientIP}`);

        res.json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log('Error creating user:', error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador del sistema'
        });
    }

}

const renewToken = async(req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT(uid,name);

    res.json({
        ok:true,
        token


    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
}
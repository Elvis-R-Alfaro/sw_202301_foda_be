import express from 'express';
const router = express.Router();
import { Usuarios, IUsuarios } from '@libs/Usuarios/usuarios';

const usuarioModel = new Usuarios();

usuarioModel.add({
    codigo: '',
    correo: "correo@gmail.com",
    nombre: "Usuario 1",
    password: "123456",
    roles: ["admin"],
});

router.get('/', (_req, res) => {
    const jsonUrls = {
        "getAll" : {
            "method" : "get",
            "url" : "usuarios/all"
        },
        "newById" : {
            "method" : "get",
            "url" : "usuarios/byid/:id"
        },
        "new" : {
            "method" : "post",
            "url" : "usuarios/new"
        },
        "update" : {
            "method" : "put",
            "url" : "usuarios/upd/:id"
        },
        "delete" : {
            "method" : "delete",
            "url" : "usuarios/del/:id"
        }
    };
    res.status(200).json(jsonUrls);
});

router.get('/all', (_req, res) => {
    res.status(200).json(usuarioModel.getAll());
});

router.get('/byid/:id', (req, res) => {
    const { id: codigo } = req.params;
    const usuario = usuarioModel.getById(codigo);
    if(usuario){
        return res.status(200).json(usuario);
    }
    return res.status(404).json({"error": "No se encontró el usuario" + codigo});
});

router.post('/new', (req, res) => {
    console.log("Usuarios / new request body: ", req.body);
    const {
        correo = 'jonhDoe@gmail.com',
        nombre = 'John Doe',
        password = '123456',
        roles = ['admin']
    } = req.body;
    const newUsuario : IUsuarios = {
        codigo: '',
        correo,
        nombre,
        password,
        roles
    };
    const usuario = usuarioModel.add(newUsuario);
    if(usuario){
        return res.status(200).json(usuario);
    }
    return res.status(500).json({"error": "No se pudo crear el usuario"});
});

router.put('/upd/:id', (req, res) => {
    const { id: codigo } = req.params;
    const {
        correo = 'jonhDoe@gmail.com',
        nombre = 'John Doe',
        password = '123456',
        roles = ['admin']
    } = req.body;
    const newUsuario : IUsuarios = {
        codigo,
        correo,
        nombre,
        password,
        roles
    };
    if(usuarioModel.update(newUsuario)){
        return res.status(200).json({"updated": true});
    }
    return res.status(500).json({"error": "No se pudo actualizar el usuario"});
});

router.delete('/del/:id', (req, res) => {
    const { id: codigo } = req.params;
    if(usuarioModel.delete(codigo)){
        return res.status(200).json({"deleted": true});
    }
    return res.status(500).json({"error": "No se pudo eliminar el usuario"});
});

export default router;





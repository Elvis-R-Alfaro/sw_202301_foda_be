import express from 'express';
import { UsuariosDao } from '@dao/models/Usuarios/UsuariosDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { Usuarios } from '@libs/Usuarios/Usuarios';
import { IUsuarios } from '@dao/models/Usuarios/IUsuarios';

const usuariosDao = new UsuariosDao(MongoDBConn);
let usuariosModel:Usuarios;

usuariosDao.init().then(()=>{
    usuariosModel = new Usuarios(usuariosDao); 
});

const router = express.Router();

router.get('/get', async (req, res)=>{
    const usuarios = await usuariosModel.getAllFromUsuarios();
    return res.status(200).json(usuarios);
});

router.post('/new', async (req, res)=>{

    const result = await usuariosModel.newUser(req.body);
    return res.status(200).json(result);
});

router.put('/upd/:usuarioId', async (req, res)=>{
    const {usuarioId} = req.params;
    const updObject = await usuariosModel.updateUser(usuarioId, req.body);
    return res.status(200).json(updObject);
});

router.delete('/del/:usuarioId', async (req, res)=>{
    const {usuarioId} = req.params;
    const updObject = await usuariosModel.deleteUser(usuarioId);
    return res.status(200).json(updObject);
});

export default router;
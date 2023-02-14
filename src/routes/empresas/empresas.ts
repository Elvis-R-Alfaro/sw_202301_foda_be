import express from 'express';
const router = express.Router();

import { EmpresasDao } from '@dao/models/Empresas/EmpresasDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { Empresas } from '@libs/Empresas/empresas';
import { IEmpresas } from '@server/dao/models/Empresas/IEmpresas';

const empresasDao = new EmpresasDao(MongoDBConn);
let empresaModel:Empresas;

empresasDao.init().then(()=>{
  empresaModel = new Empresas(empresasDao);
});

//registrar los endpoints en los routers
router.get('/', (_req, res) => {
    const jsonUrls = {
        "getAll" : {
            "method" : "get",
            "url" : "empresas/all"
        },
        "newById" : {
            "method" : "get",
            "url" : "empresas/byid/:id"
        },
        "new" : {
            "method" : "post",
            "url" : "empresas/new"
        },
        "update" : {
            "method" : "put",
            "url" : "empresas/upd/:id"
        },
        "delete" : {
            "method" : "delete",
            "url" : "empresas/del/:id"
        }
    };
    res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
    res.status(200).json(await empresaModel.getAll());
});

router.get('/byid/:id', async (req, res) => {
    const { id: codigo } = req.params;
    const empresa = await empresaModel.getById(codigo);
    if(empresa){
        return res.status(200).json(empresa);
    }
    return res.status(404).json({"error": "No se encontró la empresa"});
});

router.post('/new', async (req, res) => {
    console.log("Empresas / new request body: ", req.body);
    const {
        nombre = 'John Doe Corp', 
        status = 'Activo'
    } = req.body;
    const newEmpresa : IEmpresas = {
        codigo: '',
        nombre,
        status,
    };
    if (await empresaModel.add(newEmpresa)){
        res.status(200).json({"created": true});
    }
    return res.status(404).json({"error": "Error al agregar una nueva empresa"});
});

router.put('/upd/:id', async (req, res) => {
    const { id } = req.params;
    const { 
        nombre = 'John Doe Corp', 
        status = 'Activo', 
        observacion = '',
    } = req.body;

    const updateEmpresa : IEmpresas = {
        codigo: id,
        nombre,
        status,
        observacion
    };

    if(await empresaModel.update(id, updateEmpresa)){
        return res
            .status(200)
            .json({"updated": true});
    }
    
    return res
        .status(404)
        .json({"error": "Error al actualizar la empresa"});
});

router.delete('/del/:id', async (req, res) => {
    const { id : codigo } = req.params; //asignar el valor de id a codigo
    if(await empresaModel.delete(codigo)){
        return res
            .status(200)
            .json({"deleted": true});
    }
    return res
        .status(404)
        .json({"error": "Error al eliminar la empresa"});
});

// 200 recuros encontrado todo bien,
// 202 recurso creado sin cuerpo
// 302 recurso encontrado pero redireccionado
// 303 304 utilice el cache
// 401 no esta permitido el acceso
// 403 autorización negada
// 500 error interno del servidor

/* 
router.get('/', function(_req, res){
    
});
*/


export default router;
import express from 'express';
const router = express.Router();
import { Empresas, IEmpresas } from '@libs/Empresas/empresas';

const empresaModel = new Empresas();

empresaModel.add({
    codigo: '',
    nombre: "Empresa 1",
    status: "Activo",
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

router.get('/all', (_req, res) => {
    res.status(200).json(empresaModel.getAll());
});

router.post('/new', (req, res) => {
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
    if (empresaModel.add(newEmpresa)){
        res.status(200).json({"created": true});
    }
    return res.status(404).json({"error": "Error al agregar una nueva empresa"});
});

router.put('/upd/:id', (req, res) => {
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

    if(empresaModel.update(updateEmpresa)){
        return res
            .status(200)
            .json({"updated": true});
    }
    
    return res
        .status(404)
        .json({"error": "Error al actualizar la empresa"});
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
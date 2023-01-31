import express from 'express';
const router = express.Router();
import { Empresas } from '@libs/Empresas/empresas';

const empresaModel = new Empresas();

empresaModel.add({
    codigo: '',
    nombre: "Empresa 1",
    status: "Activo",
    created: new Date(),
    updated: new Date()
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
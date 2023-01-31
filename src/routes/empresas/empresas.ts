import express from 'express';
const router = express.Router();

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
    res.status(200).json({
        msg:'Not implemented yet'
    });
});

// 200 recuros encontrado todo bien,
// 202 recurso creado sin cuerpo
// 302 recurso encontrado pero redireccionado
// 401 no autorizado
// 403 autorización negada
// 500 error interno del servidor

/* 
router.get('/', function(_req, res){
    
});
*/


export default router;
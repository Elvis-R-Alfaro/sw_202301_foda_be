import express from 'express';
const router  = express.Router();
// REST API
// Internet => HTTP => REST API => DB
// SOAP XML wsdl
// {} -> JSON
// [] -> JSON
// { key: value }
// valor: texto, numero, booleano, array[valores], objeto{key:valor

// RST stateless, resource unique presentation
// CRUD Create, Read, Update, Delete
// HTTP   POST,  GET,   PUT,   DELETE

import empresasRouter from './empresas/empresas';
import usuariosRouter from './usuarios/usuarios';

router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
});

router.get('/version', (_req, res) =>{
  const version: string = '1.0.0';
  const jsonResp = {
    "name" : "FODA Be",
    "version" : version
  };
  // string, number, boolean, types, interfaces, classes, enumerators
  res.json(jsonResp);
});

router.use('/empresas', empresasRouter);

router.use('/usuarios', usuariosRouter);

export default router;
